import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS FILE/VoluteerTable.css"

const VolunteerTable = () => {
  const [volunteers, setVolunteers] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/volunteer/signup") 
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.error("Error fetching volunteers:", err));
  }, []);

  return (
    <div id="volunteer-table-container">
      <h2 id="volunteer-heading">Volunteer Details</h2>
      <table id="volunteer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Availability</th>
            <th>Work Days</th>
            <th>Govt Proof</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol.id}>
              <td>{vol.username}</td>
              <td>{vol.email}</td>
              <td>{vol.phone}</td>
              <td>{vol.address}</td>
              <td>{vol.availability}</td>
              <td>{vol.workDays}</td>
              <td>
                {vol.govtProof ? (
                  <img
                    src={vol.govtProof}
                    alt="Govt Proof"
                    width={50}
                    height={50}
                    id="volunteer-img"
                  />
                ) : (
                  "No Image"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerTable;
