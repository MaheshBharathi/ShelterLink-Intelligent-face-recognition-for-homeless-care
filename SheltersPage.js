import React, { useState, useEffect } from "react";
import "../CSS FILE/Shelters.css"

const OrphanageList = () => {
  const [orphanages, setOrphanages] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:5000/orphanages/list") 
      .then((response) => response.json())
      .then((data) => setOrphanages(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="shelters-page">
      <div className="title">
        <input
          type="text"
          placeholder="🔍 Search shelters..."
          className="search-bar"
        />
      </div>

      <div className="shelters-list">
        {orphanages.map((orphanage) => (
          <div
            key={orphanage.id}
            className="shelter-card"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 className="text-xl font-bold">{orphanage.name}</h2>
            <p>📍 <strong>Address:</strong> {orphanage.address}</p>
            <p>📞 <strong>Contact:</strong> {orphanage.contact}</p>
            <p>🛏️ <strong>Capacity:</strong> {orphanage.capacity} beds available</p>
            <p>✅ <strong>Services:</strong> {orphanage.services || "No services available"}</p>
            <button className="details-btn">
              🔍 View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrphanageList;


