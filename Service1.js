import React from 'react';
import "../CSS FILE/Services.css"

export default function Service1() {
  const services = [
    {
      title: 'Shelter Assistance',
      description: 'Providing homeless individuals with safe shelter and living essentials.',
      icon: '🏠'
    },
    {
      title: 'Food Distribution',
      description: 'Ensuring access to healthy meals for those in need.',
      icon: '🍽️'
    },
    {
      title: 'Healthcare Support',
      description: 'Helping individuals receive medical attention and health services.',
      icon: '⚕️'
    },
    {
      title: 'Education & Skill Training',
      description: 'Empowering people through education and skill-building programs.',
      icon: '📚'
    },
    {
      title: 'Employment Assistance',
      description: 'Connecting individuals with job opportunities and career guidance.',
      icon: '💼'
    },
    {
      title: 'Emergency Support',
      description: 'Providing urgent help in times of crisis and disaster relief.',
      icon: '🚑'
    }
  ];

  return (
    <div className="services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="section-description">
        We are dedicated to helping the homeless by providing essential services to improve their quality of life.
      </p>
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

