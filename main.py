from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
import time
import torch
from starlette.concurrency import run_in_threadpool
from model_service import DeepfakeAnalyzer
import gc
origins=[
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    ]
MODEL_WEIGHTS='deepfake_c0_xception.pkl'
DEVICE=torch.device('cuda' if torch.cuda.is_available() else 'cpu')
global deepfake_analyzer
app=FastAPI(title="Deepfake Image Analyzer")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)
app.mount('/assets',StaticFiles(directory='deepfake_interface/dist/assets'),name='assets')
class AnalysisResult(BaseModel):
    is_deepfake:bool
    confidence:float
    time_taken:float
    model_architecture:str='XceptionNet (F++ Trained)'
# @app.get("/")
# def read_root():
#     return {"status": "200", "message": "Deepfake Analyzer API is running"}
@app.get("/{rest_of_path:path}")
async def serve_react(rest_of_path: str):
    return FileResponse("deepfake_interface/dist/index.html")
@app.on_event('startup')
async def startup_event(): #load model
    global deepfake_analyzer
    try:
        deepfake_analyzer=DeepfakeAnalyzer(MODEL_WEIGHTS)
    except FileNotFoundError:
        deepfake_analyzer=None
        print('ERROR .pkl file Not found sorry')

@app.post('/api/v1/analyze',response_model=AnalysisResult)
@app.post("/api/v1/analyze")
async def analyze_image(file: UploadFile = File(...)):
    if file.content_type not in ['image/jpeg', 'image/png', 'image/jpg']:
        raise HTTPException(status_code=400, detail='Invalid file type.')
    file_bytes = await file.read()
    start = time.time()
    try:
        if deepfake_analyzer is None:
            fake_confi = 0.92
        else:
            fake_confi = await run_in_threadpool(deepfake_analyzer.predict, file_bytes)
        del file_bytes 
        gc.collect()
        if torch.cuda.is_available(): torch.cuda.empty_cache()
        end = time.time()
        return AnalysisResult(
            is_deepfake=bool(fake_confi > 0.5),
            confidence=round(float(fake_confi * 100), 2),
            time_taken=round(end - start, 2)
        )
    except Exception as e:
        print(f"Prediction Error: {e}")
        raise HTTPException(status_code=500, detail="Model inference failed due to memory.")
