import React ,{ useState, useRef } from "react"
import Prediction from "./resultdata";
import UseApi from "./DeepfakeApi";
function Deepfake(){
    const [Selectedfile, setSelectedfile]=useState(null);
    const [previewUrl, setPreviewUrl]=useState(null);
    const { result, loading, error, Analyze } =UseApi();
    const fileref=useRef(null);
    const handelfile= (event)=>{
        if(event.target.files && event.target.files[0]){
            setSelectedfile(event.target.files[0]);
            setPreviewUrl(URL.createObjectURL(event.target.files[0]));
        }
        else{
            setSelectedfile(null)
            setPreviewUrl(null)
        }
    };
    async function handelClick(){
        if(!Selectedfile){
            alert('Please select an Image file first. (.jpeg, .png, .jpg)')
            return
        }
        console.log('Starting Analysis for File ', Selectedfile.name);
        await Analyze(Selectedfile);
        console.log('Analysis Completed.')
    }
    return (
        <>
        <div className="box">
            <div className="deepfake-analyzer-container">
                <div className="light"></div>
                <h2>Deepfake Image Analyzer</h2>
                <input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    ref={fileref}
                    onChange={handelfile} 
                    disabled={loading}
                />
                {Selectedfile && (
                    <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {previewUrl && (
                            <img 
                                src={previewUrl} 
                                alt="Selected Preview" 
                                style={{maxWidth: '100px', maxHeight: '100px', marginBottom: '10px', border: '1px solid #42dc00ff', borderRadius: '5px'}} 
                            />
                        )}
                        <p>File Ready: **{Selectedfile.name}**</p>
                    </div>)}
                <button 
                    id="check_btn" 
                    onClick={handelClick}
                    disabled={!Selectedfile || loading}
                >
                    {loading ? 'Analyzing...' : 'Valuate Image'}
                </button>
                {error && <p style={{color: 'red'}}>Error: {error}</p>}
            </div>
            {(result || loading) && (
                 <Prediction result={result} loading={loading} />
            )}
        </div>
        </>
    )
}
export default Deepfake