import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerTable from "./VolunteerTable";
import ReportTable from "./ReportTable";
import Admin from "./Admin";
import rescueimg from "../Images/rescuehome.png";
import shelterimg from "../Images/shelter.png";
import uploadimg from "../Images/upload.png";

import { Navigate, NavLink, useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [beggars, setBeggars] = useState([]);
  const [shelters, setShelters] = useState([]);
    const navigate=useNavigate();
   const handlevol=()=>
    {
      navigate('/VolunteerTable');
    }
    const handlerep=()=>
      {
        navigate('/reporttable');
      }
      const handlesel=()=>
        {
          navigate('/admin');
        }
        const handleorp=()=>
          {
            navigate('/page');
          }
 

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li>Dashboard</li>
         
        </ul>
      </aside>

      <main className="content">
        

        <div className="steps">
          <div className="step">
            <img src={uploadimg} alt="volunteers" className="step-image" /><br></br><br></br>
            <p>Volunteer Details</p>
            <button className="home-button" onClick={handlevol} >VIEW</button>
          </div>
          <div className="step">
            <img src={rescueimg} alt="beggars" className="step-image" /><br></br>
            <br></br>
            <p>Beggar Details</p><br></br>
            <button className="home-button" onClick={handlerep}>VIEW</button>
          </div>
          <div className="step">
            <img src={shelterimg} alt="Shelters" className="step-image" /><br></br><br></br>
           
            <p>Shelter Details</p><br></br>
            <button className="home-button" onClick={handlesel}>VIEW</button>
          </div>
          <div className="step">
            <img src={shelterimg} alt="Shelters" className="step-image" /><br></br><br></br>
           
            <p>Add Shelter</p><br></br>
            <button className="home-button" onClick={handleorp}>Click here</button>
          </div>
        </div>
    

 </main>
    </div>
  );
};

export default Dashboard;
