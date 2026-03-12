import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        availability: '',
        workDays: '',
        password: '',
        govtProof: ''
    });

  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData({ ...formData, govtProof: reader.result });
            };
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/volunteer/signup", formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error);
            alert("Signup Failed. Please try again.");
        }
    };


    return (
        <div className="formcont">
            <div className="sig1">
                <h2 className="signup-title">Volunteer Signup</h2>
                <form onSubmit={handleSubmit} className="signup-form">

                    <label className="sig2">Volunteer Name</label>
                    <input type="text" className="sig3" name="username" value={formData.username} onChange={handleChange} required />

                    <label className="sig2">Email</label>
                    <input type="email" className="sig3" name="email" value={formData.email} onChange={handleChange} required />

                    <label className="sig2">Phone Number</label>
                    <input type="text" className="sig3" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label className="sig2">Address</label>
                    <textarea className="sig3" name="address" value={formData.address} onChange={handleChange} required></textarea>

                    <label className="sig2">Availability</label>
                    <select className="sig4" name="availability" value={formData.availability} onChange={handleChange} required>
                        <option value="">Select Availability</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                    </select>

                    <label className="sig2">Work Days</label>
                    <select className="sig4" name="workDays" value={formData.workDays} onChange={handleChange} required>
                        <option value="">Select Work Days</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                    </select>

                    <label className="sig2">Password</label>
                    <input type="password" className="sig3" name="password" value={formData.password} onChange={handleChange} required />

                    <label className="sig2">Upload Govt Proof (Aadhar/PAN/ID)</label>
                    <input type="file" className="sig3" accept="image/*" onChange={handleFileUpload} required />
                    {formData.govtProof && <img src={formData.govtProof} alt="Govt Proof" width={100} height={100} />}

                    <button type="submit" className="sig5">Signup</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
}

