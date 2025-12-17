import React from 'react';
function Prediction({ result }) {
    if (!result) return null;
    const confidenceScore = (result.confidence).toFixed(2);
    let answer=result.is_deepfake ? 'FAKE' : 'REAL';
    const timeTaken = result.time_taken.toFixed(2);
    let verdictColor = 'green';
    let detailedMessage = '';
    if (result.confidence > 70){
        verdictColor = 'rgb(255, 99, 99)';
        detailedMessage = "High probability of manipulation. Note: Score may be inflated by compression artifacts or severe lighting.";
    } else if (result.confidence > 40){
        verdictColor = 'yellow';
        answer='REAL/FAKE'
        detailedMessage = "Uncertainty detected. Model is inconclusive due to mixed features or image quality.";
    } else {
        verdictColor = 'rgb(74, 255, 54)';
        detailedMessage = "Strong confidence in image authenticity.";
    }
    return (
        <div className="result-box">
            <h2>Analysis Results</h2>
            <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
            <h3 style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                Image is classified as: <span style={{ color: verdictColor }}>{answer}</span>
            </h3>
            <h3>Confidence of FAKE: <strong>{confidenceScore}%</strong></h3>
            <h3 style={{ color: verdictColor, fontStyle: 'italic', fontSize: '1.2em' }}>
                <a style={{color:'white', fontStyle:'normal'}}>Conclusion:</a> {detailedMessage}
            </h3>
            <hr style={{ width: '100%', borderColor: 'rgba(255, 254, 254, 0.28)' }} />
            <p style={{ fontSize: '1em' }}>
                Analysis Time: <strong>{timeTaken}sec</strong>
            </p>
        </div>
    );
}
export default Prediction;