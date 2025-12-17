import { Color } from "three/src/Three.Core.js"
import Deepfake from "."
import FloatingLines from "./DarkVeil"
function App() {
  return(
    <>
      <FloatingLines 
        enabledWaves={['top', 'middle', 'bottom']}
        // Array - specify line count per wave; Number - same count for all waves
        lineCount={[12, 15, 28]}
        // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={[8, 40, 4]}
        bendRadius={5.2}
        bendStrength={-0.6}
        interactive={false}
        parallax={false}
      />
      <div className="box">
        <div className="hero">
          <h2><strong style={{color:'rgb(30, 127, 253)'}}>Welcome</strong> to the deepfake Image Analyzer</h2>
          <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
          <p style={{fontSize:'larger', fontWeight:700}}>Hey! This was an Modern Deep-Fake Image Analyzer</p>
          <p style={{fontSize:'large', fontWeight:650}}>&bull; Our model provides a <strong style={{color:'rgba(209, 234, 23, 1)', fontWeight:750}}>confidence score</strong>, classifying the image as <b style={{color:'rgba(16, 255, 40, 1)'}}>'REAL'</b> or <b style={{color:'Red'}}>'FAKE'</b> based on subtle artifacts invisible to the human eye.</p>
          <p style={{fontSize:'large', fontWeight:650}}>&bull; It gives the RealTime analysis of provided Image with Refined Model from FaceForensics++. </p>
          <p style={{fontSize:'large', fontWeight:650}}>&bull; All analysis is performed instantly by a dedicated backend service built on the <b style={{color:'rgba(66, 229, 167, 1)'}}>FastAPI</b> framework, ensuring speed and reliability.</p>
          <p style={{fontSize:'large', fontWeight:650}}>&bull; The system utilizes a fine-tuned <strong style={{color:'rgba(255, 126, 20, 1)'}}>XceptionNet</strong> architecture, a powerful Convolutional Neural Network (CNN) known for its deep feature extraction capabilities.</p>
          <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
          <h4>Scroll Down to see Analysis 👇⬇</h4>
        </div>
      </div>
      <div className="scrollable-section section-results">
          <div className="second-hero">
            <h1>Analyze Your Image</h1>
          </div>
          <Deepfake/>
          <p></p>
      </div>

      {}
      <div className="scrollable-section section-docs-credits">
        <div className="third-hero">
          <h1>Documentation & Links</h1>
        </div>
        <p>This was an React and Python powered application and Ai model is refined from FaceForensics++</p>
        <p>As this was Completely Based on Model's prediction So Please verify the results for best conclusions</p>
        <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
        <label>Cases Where my Model can fail:</label>
        <ul>
          <li>Person's face contains High Shadows, high exposure </li>
          <li>-ve Result When Image is Highly Blurred</li>
          <li>-ve result for sharp edge Images</li>
        </ul>
        <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
        <a href='.hero'>Visit Github</a><a href='.second-hero'>LinkedIn</a>
        <a>Special Thanks to: </a>
        <a style={{color:'rgba(14, 154, 255, 0.89)'}} href="https://reactbits.dev/" target="__blank">reactbits.dev</a>
        <a style={{color:'rgba(14, 153, 252, 0.89)'}} href="https://github.com/ondyari/FaceForensics" target="__blank">FaceForensics++ Github link</a>
      </div>
    </>
  )
}

export default App
