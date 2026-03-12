import React, { useState } from "react";
import "../CSS FILE/UniqueImageUpload.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import capture2 from "../Images/capture2.png";
import uploadrescue from "../Images/upload-rescue.png";

const UniqueImageUpload = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [result, setResult] = useState("");

  const handleCameraClick = () => {
    navigate('/reportpage');
  };

  const handleUploadClick = () => {
    navigate('/report');
  };

  // ✅ Image Upload for AI
  const handleAIImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  // ✅ Call Backend Gemini API
  const analyzeImage = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        { image }
      );

      setResult(response.data.result);

    } catch (error) {
      console.error(error);
      alert("AI analysis failed");
    }
  };

  return (
    <div className="beggar-container">
      <h1 className="beggar-title">BEGGER IDENTIFICATION</h1>

      <div className="beggar-options">

        {/* Camera */}
        <div className="beggar-card">
          <img src={capture2} alt="Camera Icon" className="beggar-image" />
          <p className="beggar-card-title">Use Our Camera</p>
          <button className="beggar-button beggar-camera-btn" onClick={handleCameraClick}>
            Use Our Camera
          </button>
        </div>

        {/* Gallery */}
        <div className="beggar-card">
          <img src={uploadrescue} alt="Upload Icon" className="beggar-image" />
          <p className="beggar-card-title">Upload from Gallery</p>
          <button className="beggar-button beggar-upload-btn" onClick={handleUploadClick}>
            Upload from Gallery
          </button>
        </div>

        {/* 🔥 AI Detection */}
        <div className="beggar-card">
          <p className="beggar-card-title">AI Age & Gender Detection</p>

          <input type="file" accept="image/*" onChange={handleAIImageUpload} />

          <button className="beggar-button beggar-upload-btn" onClick={analyzeImage}>
            Analyze with AI
          </button>

          {result && <p><b>{result}</b></p>}
        </div>

      </div>
    </div>
  );
};

export default UniqueImageUpload;