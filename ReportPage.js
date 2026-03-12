import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../CSS FILE/ReportPage.css"

const ReportPage = () => {
    const webcamRef = useRef(null);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({
        pincode: "Not detected",
        village: "Not detected",
        taluk: "Not detected",
        district: "Not detected",
        state: "Not detected",
        country: "Not detected"
    });
    const [description, setDescription] = useState("");


    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    };

    
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                    

                    const details = response.data.address;
                    setLocation({
                        pincode: details.postcode || "N/A",
                        village: details.village || details.hamlet || "N/A",
                        taluk: details.county || "N/A",
                        district: details.state_district || "N/A",
                        state: details.state || "N/A",
                        country: details.country || "N/A"
                    });
                } catch (error) {
                    console.error("Error fetching location:", error);
                }
            }, () => {
                console.error("Unable to retrieve location.");
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image || !description) {
            alert("Please capture an image and enter a description.");
            return;
        }

        const reportData = {
            image,
            location,
            description,
            timestamp: new Date().toISOString() 
        };

        try {
            await axios.post("http://localhost:5000/api/reports", reportData);
            alert("Report submitted successfully!");
            
            setImage(null);
            setDescription("");
            setLocation({
                pincode: "Not detected",
                village: "Not detected",
                taluk: "Not detected",
                district: "Not detected",
                state: "Not detected",
                country: "Not detected"
            });
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report.");
        }
    };

    return (
        <div id="report-container">
            <h2 id="report-heading">Report a Beggar</h2>

            
            <div id="webcam-container">
                <Webcam ref={webcamRef} screenshotFormat="image/png" width={400} height={300} />
                <br />
                <button onClick={capture}>Capture Image</button>
            </div>

        
            <label className="datareport-label">Location:</label>
            <button type="button" onClick={getLocation} className="datareport-button">
                Detect Location
            </button>
            <p className="datareport-location">
                <b>Pincode:</b> {location.pincode} <br />
                <b>Village:</b> {location.village} <br />
                <b>Taluk:</b> {location.taluk} <br />
                <b>District:</b> {location.district} <br />
                <b>State:</b> {location.state} <br />
                <b>Country:</b> {location.country}
            </p>

            
            {image && (
                <div id="image-container">
                    <h3>Captured Image:</h3>
                    <img src={image} alt="Captured" width={400} />
                </div>
            )}

        
            <textarea 
                placeholder="Enter description..." 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />

        
            <button onClick={handleSubmit}>Submit Report</button>
        </div>
    );
};

export default ReportPage;



