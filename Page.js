import React, { useState } from "react";
import axios from "axios";
import Admin from "./Admin";

export default function Page() {
    const [orpData, setOrpData] = useState({
        name: '',
        address: '',
        categories: '',
        capacity: '',
        services: '',
        contact: '',
        image: ''
    });

    const [showTable, setShowTable] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:5000/orphanages/add", orpData) 
            .then(res => {
                alert("Data added successfully");
                setOrpData({ name: '', address: '', categories: '', capacity: '', services: '', contact: '', image: '' });
           
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            {!showTable && (  
                <div className='formCont'>
                    <form onSubmit={handleSubmit} className="admform">
                        <label className="admlab">Orphanage Name</label><br />
                        <input type='text' name='name' value={orpData.name} onChange={handleChange} required className="adminp"/><br />

                        <label className="admlab">Address</label><br />
                        <textarea name='address' value={orpData.address} onChange={handleChange} required className="adminp"></textarea><br />

                        <label className="admlab">Categories</label><br />
                        <select name="categories" value={orpData.categories} onChange={handleChange} required className="adminp">
                            <option value="" className="cate">Select Category</option>
                            <option value="Children" className="cate">Children</option>
                            <option value="Disabled" className="cate">Disabled</option>
                            <option value="Elderly" className="cate">Elderly</option>
                            <option value="Homeless" className="cate">Homeless</option>
                        </select><br />

                        <label className="admlab">Capacity</label><br />
                        <input type='number' name='capacity' value={orpData.capacity} onChange={handleChange} required className="adminp" /><br />

                        <label className="admlab">Services</label><br />
                        <input type='text' name='services' value={orpData.services} onChange={handleChange} required className="adminp" /><br />

                        <label className="admlab">Contact</label><br />
                        <input type='text' name='contact' value={orpData.contact} onChange={handleChange} required className="adminp" /><br />

                        <label className="admlab">Image</label><br />
                        <input type='file' name='image' accept="image/*" onChange={handleImageUpload} required className="adminp"/><br />
                        {orpData.image && <img src={orpData.image} alt="Uploaded Preview" width={100} height={100} />}<br />

                        <button type='submit' className="admbtn">Submit</button>
                    </form>
                </div>
            )}
          
        </div>
    );
}