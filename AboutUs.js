import React from "react";
import "../App.css";
import logo from "../Images/logo.png"; 
import aboutWomen from "../Images/aboutwomen.png"; 

export default function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>We are dedicated to building a better future for the homeless.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our goal is to provide shelter, resources, and support to those in need.
            We aim to create a world where no one has to live without a home.
          </p>
        </div>
        <div className="about-image">
          <img src={logo} alt="Helping Hands" />
        </div>
        <div className="about-text">
          <h2>Our Vision</h2>
          <p>
            Our goal is to provide shelter, resources, and support to those in need.
            We aim to create a world where no one has to live without a home.
          </p>
        </div>
      </div>
      

      <h2 className="team-heading">Meet Our Team</h2>
      <div className="team-section">
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Divya B</h4>
          <p>Team Leader</p>
        </div>
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Murugalakshmi M</h4>
          <p>Team Member</p>
        </div>
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Abinaya K</h4>
          <p>Team Member</p>
        </div>
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Gowsalya M</h4>
          <p>Team Member</p>
        </div>
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Anupriya A</h4>
          <p>Team Member</p>
        </div>
        <div className="team-member">
          <img src={aboutWomen} alt="Team Member" />
          <h4>Abinaya B</h4>
          <p>Team Member</p>
        </div>
      </div>
    </div>
  );
}
