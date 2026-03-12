import axios from "axios";
import { useState } from "react";

export default function Update({ data, setPopup, refreshData }) {
    const [orpData, setOrpData] = useState({
        name: data.name || "",
        address: data.address || "",
        categories: data.categories || "",
        capacity: data.capacity || "",
        services: data.services || "",
        contact: data.contact || "",
        image: data.image || "",
    });

    
    const handleChange = (e) => {
        setOrpData({ ...orpData, [e.target.name]: e.target.value });
    };

    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setOrpData({ ...orpData, image: reader.result }); 
            };
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!data._id) {
                alert("Error: Invalid orphanage ID.");
                return;
            }

            const response = await axios.put(
                `http://localhost:5000/orphanages/update/${data._id}`, 
                orpData, 
                { headers: { "Content-Type": "application/json" } }
            );

            alert("Orphanage updated successfully!");
            if (setPopup) setPopup(false); 
            if (refreshData) refreshData(); 
        } catch (err) {
            console.error(" Error updating orphanage:", err);
            alert("Failed to update orphanage. Please try again.");
        }
    };

    return (
        <div className="update-container">
            <div className="update-popup">
                <form className="update-form" onSubmit={handleSubmit}>
                    <button type="button" onClick={() => setPopup(false)} className="close-btn">X</button>

                    <label className="update-label">Orphanage Name:</label>
                    <input type="text" name="name" value={orpData.name} onChange={handleChange} required className="update-input" />

                    <label className="update-label">Address:</label>
                    <textarea name="address" value={orpData.address} onChange={handleChange} required className="update-input"></textarea>

                    <label className="update-label">Categories:</label>
                    <select name="categories" value={orpData.categories} onChange={handleChange} required className="update-input">
                        <option value="">Select Category</option>
                        <option value="Children">Children</option>
                        <option value="Disabled">Disabled</option>
                        <option value="Elderly">Elderly</option>
                        <option value="Homeless">Homeless</option>
                    </select>

                    <label className="update-label">Capacity:</label>
                    <input type="number" name="capacity" value={orpData.capacity} onChange={handleChange} required className="update-input" />

                    <label className="update-label">Services:</label>
                    <input type="text" name="services" value={orpData.services} onChange={handleChange} required className="update-input" />

                    <label className="update-label">Contact:</label>
                    <input type="text" name="contact" value={orpData.contact} onChange={handleChange} required className="update-input" />

                    <label className="update-label">Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="update-input" />
                    {orpData.image && <img src={orpData.image} alt="Preview" width={100} height={100} className="preview-img" />}

                    <button type="submit" className="update-btn">Update</button>
                </form>
            </div>
        </div>
    );
}
