
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS FILE/ReportTable.css"

const ReportTable = () => {
    const [reports, setReports] = useState([]);

  
    useEffect(() => {
        axios.get("http://localhost:5000/api/reports") 
            .then((res) => setReports(res.data))
            .catch((err) => console.error("Error fetching reports:", err));
    }, []);

    return (
        <div className="report-table">
            <h2>Submitted Reports</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Pincode</th>
                        <th>Village</th>
                        <th>Taluk</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Description</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => {
                        const location = report.location || {};
                        return (
                            <tr key={index}>
                                <td>
                                    {report.image ? <img src={report.image} alt="Report" width={100} height={100} /> : "No Image"}
                                </td>
                                <td>{location.pincode || "N/A"}</td>
                                <td>{location.village || "N/A"}</td>
                                <td>{location.taluk || "N/A"}</td>
                                <td>{location.district || "N/A"}</td>
                                <td>{location.state || "N/A"}</td>
                                <td>{location.country || "N/A"}</td>
                                <td>{report.description || "N/A"}</td>
                                <td>{new Date(report.timestamp).toLocaleString() || "N/A"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;