import React from "react";
import "../App.css";

import rescueimg from "../Images/rescuehome.png";
import shelterimg from "../Images/shelter.png";
import uploadimg from "../Images/upload.png";

import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from './Auth';




const HomePage = () => {
  const auth=useAuth()
  const navigate=useNavigate()
  return (
    <div className="homepage">
      

      <header className="header">
        <h1><i>"Transforming Lives, One Step at a Time!"</i></h1>
        <p id="subheader">"Our platform connects beggars, orphans, and elderly people with those who want to help.<br></br>Join us in making a difference!"</p>
       
      </header>

      
        
        <div className="steps">
          <div className="step">
            <img src={uploadimg} alt="Upload" className="step-image" /><br></br><br></br>
            <p>Help Those in Need—Be the Change!</p>
            <p>Upload images & locations of beggars/orphans.</p>
            <button className="home-button" onClick={()=>navigate('image')} >Upload</button>
          </div>
          <div className="step">
            <img src={rescueimg} alt="Rescue" className="step-image" /><br></br>
            <br></br><p>Join our Rescue Team</p>
            <p>Register and help on the ground.</p><br></br>
            <button className="home-button" onClick={()=>navigate('Signup')}>JOIN</button>
          </div>
          <div className="step">
            <img src={shelterimg} alt="Shelters" className="step-image" /><br></br><br></br>
            <p>Find shelter support information.</p>
            <p>Near By You</p><br></br>
            <button className="home-button" onClick={()=>navigate('SheltersPage')}>SHELTER</button>
          </div>
        </div>
    

     
    </div>
  );
};

export default HomePage;
