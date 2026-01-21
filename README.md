# Deep-Fake Image Analyzer

A full-stack AI application that detects AI-generated (Deepfake) faces using an **Xception-based Convolutional Neural Network**.

 **Live Demo:** [https://rohan45327-deepfake-image-analyzer.hf.space/](https://rohan45327-deepfake-image-analyzer.hf.space/)

Note: The live link was published via HuggingFace 🤗 so it will take 5-10 seconds to load at first instance.

---

##  Features
* **Real-time Analysis:** Upload any JPG/PNG image to determine if a face is real or manipulated.
* **Xception Model:** Leverages a pre-trained Xception network fine-tuned for facial forensics.
* **FastAPI Backend:** High-performance Python API for handling model inference.
* **React Frontend:** Modern, responsive UI built with Vite and Three.
* **Production Ready:** Fully deployed on HuggingFace with Docker, Git LFS for large model storage.

---

##  Tech Stack
| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, three |
| **Backend** | FastAPI, Gunicorn, Uvicorn |
| **Deep Learning** | PyTorch, Torchvision, Xception |
| **Deployment** | HuggingFace, Docker, Git LFS |
| **Model** | FaceForensics++ |

---

##  Screenshots

<img width="1920" height="1080" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/d56291ba-d33c-40b3-928f-aa43fb88f1ff" />

---

<img width="1080" height="1080" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/e5b22849-9f47-458a-97cd-0a9bd91e1e74" />


##  How It Works
1. **Preprocessing:** The uploaded image is resized to 299x299 pixels and normalized.
2. **Inference:** The tensor is passed through the Xception model, which analyzes high-frequency noise and facial textures often ignored by the human eye.
3. **Result:** The model returns a confidence score. If the score is > 0.5, the image is flagged as a potential Deepfake.

---

##  Deep Learning Architecture

### The Dataset: FaceForensics++
The model was trained using the **FaceForensics++** dataset, a benchmark for facial manipulation detection. 
* **Diverse Methods:** It contains thousands of videos manipulated by four automated methods: *Deepfakes, Face2Face, FaceSwap,* and *NeuralTextures*.
* **Real vs. Fake:** It provides a balanced set of authentic and tampered imagery, allowing the model to learn the subtle "fingerprints" left by generative AI.

### The Model: Xception Network
For the core architecture, I utilized the **Xception** (Extreme Inception) model.
* **Depthwise Separable Convolutions:** Unlike standard CNNs, Xception looks at cross-channel correlations and spatial correlations separately. This makes it highly efficient at finding fine-grained artifacts in skin textures.
* **Transfer Learning:** The model uses weights pre-trained on ImageNet, then fine-tuned on FaceForensics++ to specialize in identifying the boundary between real and synthetic pixels.

----

##  Project Structure
    .
    ├── main.py                 # FastAPI Entry Point & API Routes
    ├── model_service.py        # Logic for Model Loading & Inference
    ├── requirements.txt        # Python Dependencies
    ├── network/                # Xception Architecture & Neural Network Files
    │   └── models.py
    ├── deepfake_interface/     # Frontend (React + Three.js)
    │   ├── src/
    │   │   ├── components/     # UI Components & 3D Visuals
    │   │   └── services/       # API Call Logic (Axios)
    │   └── vite.config.js
    └── model/                  # Model Weights (Stored via Git LFS)
        └── xception_model.pkl

---

##  Local Installation

1. **Clone the Repo**
   ```bash
   git clone https://github.com/rohan45327/Deep-Fake-Image-Analyzer.git
   cd Deep-Fake-Image-Analyzer
2. **Backend Setup**
   ```bash
   pip install -r requirements.txt
   uvicorn main:app --reload
3. **Frontend Setup**
   ```bash
   cd deepfake_interface
   npm install
   npm run dev
   
---

##  Limitations & Potential Failures
While the Xception model is highly effective, it may produce inaccurate results in the following scenarios:

* **Low-Resolution Images:** Deepfake detection often relies on micro-textures. If an image is heavily compressed or blurry, the model may miss the artifacts of manipulation.
* **Extreme Lighting/Angles:** If the face is in deep shadow or at an extreme side profile, the feature extraction may be less reliable.
* **Adversarial Attacks:** Sophisticated deepfakes specifically designed to fool CNNs (adversarial examples) may bypass detection.
* **Multiple Faces:** The current version is optimized for single-face analysis; performance may vary when multiple subjects are in the frame.
* **New Generative Techniques:** As GANs and Diffusion models (like Sora or Midjourney v6) evolve, the artifacts they leave behind change, requiring constant model retraining.

---

### Distributed under MIT license
