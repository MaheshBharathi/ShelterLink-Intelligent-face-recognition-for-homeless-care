import React, { useEffect, useState } from "react";
import axios from "axios";
import Update from "./Update";


export default function Admin() {
  const [list, setList] = useState([]);
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState({});


  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orphanages/list");
      setList(res.data);
    } catch (err) {
      console.log(" Error fetching orphanages:", err);
    }
  };


  const handleDel = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/orphanages/delete/${id}`);

      if (response.status === 200) {
        alert(" Deleted successfully!");
        setList((prevList) => prevList.filter((x) => x._id !== id));
      } else {
        throw new Error(" Failed to delete orphanage.");
      }
    } catch (error) {
      console.error(" Error deleting orphanage:", error);
      alert(" Failed to delete orphanage. Please check if the ID exists.");
    }
  };

  
  const handleEdit = (data) => {
    setPopup(true);
    setData(data);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Orphanage Management</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Categories</th>
            <th>Image</th>
            <th>Contact</th>
            <th>Services</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((x) => (
            <tr key={x._id}>
              <td>{x.name}</td>
              <td>{x.address}</td>
              <td>{x.categories}</td>
              <td>
                <img src={x.image} width={100} height={100} alt="Orphanage" />
              </td>
              <td>{x.contact}</td>
              <td>{x.services}</td>
              <td>{x.capacity}</td>
              <td>
                <button onClick={() => handleEdit(x)} className="edit-btn">Edit</button>
                <button onClick={() => handleDel(x._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {popup && <Update data={data} setPopup={setPopup} refreshData={fetchOrphanages} />}
    </div>
  );
}
