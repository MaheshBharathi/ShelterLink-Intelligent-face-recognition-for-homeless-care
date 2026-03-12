import React, { useState } from "react";
import axios from "axios";
import "../CSS FILE/Report.css";

export default function DataReport() {
    const [reportData, setReportData] = useState({
        location: {
            pincode: "",
            village: "",
            taluk: "",
            district: "",
            state: "",
            country: "",
        },
        category: "",
        description: "",
        image: "",
    });


    const handleChange = (e) => {
        setReportData({ ...reportData, [e.target.name]: e.target.value });
    };

    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setReportData({ ...reportData, image: reader.result });
            };
        }
    };

    
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );

                    const address = response.data.address;
                    setReportData((prevData) => ({
                        ...prevData,
                        location: {
                            pincode: address.postcode || "N/A",
                            village: address.village || "N/A",
                            taluk: address.county || "N/A",
                            district: address.state_district || "N/A",
                            state: address.state || "N/A",
                            country: address.country || "N/A",
                        }
                    }));
                } catch (error) {
                    console.error("Error fetching location:", error);
                    alert("Unable to retrieve location data.");
                }
            }, () => {
                alert("Unable to retrieve location.");
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!reportData.image || !reportData.category || !reportData.description) {
            alert("Please upload an image, select a category, and enter a description.");
            return;
        }

        const reportPayload = {
            image: reportData.image,
            location: reportData.location,  
            category: reportData.category,
            description: reportData.description,
        };

        console.log("Submitting Data:", reportPayload);

        try {
            const response = await axios.post("http://localhost:5000/api/reports", reportPayload);
            console.log("Server Response:", response.data);
            alert("Report submitted successfully!");

            
            setReportData({
                location: {
                    pincode: "",
                    village: "",
                    taluk: "",
                    district: "",
                    state: "",
                    country: "",
                },
                category: "",
                description: "",
                image: "",
            });
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report. Please try again.");
        }
    };

    return (
        <div className="datareport-body">
            <div className="datareport-container">
                <h2 className="datareport-title">Report a Tramp</h2>
                <center>
                    <form onSubmit={handleSubmit} className="datareport-form">
                        
                    
                        <label className="datareport-label">Upload Image:</label>
                        <input type="file" className="datareport-input" accept="image/*" onChange={handleImageUpload} />
                        {reportData.image && <img src={reportData.image} alt="Uploaded Preview" width={100} height={100} />}<br />

                    
                        <label className="datareport-label">Location:</label>
                        <button type="button" onClick={getLocation} className="datareport-button">Detect Location</button>
                        <p className="datareport-location">
                            <b>Pincode:</b> {reportData.location.pincode} <br />
                            <b>Village:</b> {reportData.location.village} <br />
                            <b>Taluk:</b> {reportData.location.taluk} <br />
                            <b>District:</b> {reportData.location.district} <br />
                            <b>State:</b> {reportData.location.state} <br />
                            <b>Country:</b> {reportData.location.country}
                        </p>

                        
                        <label className="datareport-label">Category:</label>
                        <select className="datareport-input" name="category" value={reportData.category} onChange={handleChange}>
                            <option value="">Select a Category</option>
                            <option value="Physically Disabled">Physically Disabled</option>
                            <option value="Mentally Disabled">Mentally Disabled</option>
                            <option value="Normal Person">Normal Person</option>
                            <option value="Child">Child</option>
                            <option value="Old Age">Old Age</option>
                        </select>

                
                        <label className="datareport-label">Description:</label>
                        <textarea className="datareport-textarea" rows="4" name="description" value={reportData.description} onChange={handleChange}></textarea>

                        
                        <button type="submit" className="datareport-submit">Submit Report</button>
                    </form>
                </center>
            </div>
        </div>
    );
}
