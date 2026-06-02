import React, { useEffect, useState } from "react";

import { getAllMagazines } from "../apis/magazine";
import { toast } from "react-toastify";

const MagazineFormData = () => {
  const [magazines, setMagazines] = useState([]);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const res = await getAllMagazines();
        if (res.success) {
          setMagazines(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        console.error("Error fetching magazines:", err);
        toast.error("Failed to fetch data");
      }
    };

    fetchMagazines();
  }, []);

  const thStyle = {
  padding: "12px",
  fontSize: "14px",
  textTransform: "uppercase",
};

const tdStyle = {
  padding: "10px",
  fontSize: "14px",
};

  return (
    <>
   
    <div style={{ padding: "25px" }}>
  <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
    Magazine Form Data
  </h2>

  {magazines.length === 0 ? (
    <p>No data found</p>
  ) : (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#2c3e50", color: "#fff" }}>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>DOB</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>Pin</th>
            <th style={thStyle}>Contact</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Transaction ID</th>
            <th style={thStyle}>Signature</th>
          </tr>
        </thead>

        <tbody>
          {magazines.map((mag, index) => (
            <tr
              key={mag._id}
              style={{
                textAlign: "center",
                borderBottom: "1px solid #eee",
              }}
            >
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{mag.name}</td>
              <td style={tdStyle}>
                {new Date(mag.dob).toLocaleDateString()}
              </td>
              <td style={{ ...tdStyle, maxWidth: "200px" }}>
                {mag.address}
              </td>
              <td style={tdStyle}>{mag.city}</td>
              <td style={tdStyle}>{mag.pin}</td>
              <td style={tdStyle}>{mag.contact}</td>
              <td style={{ ...tdStyle, color: "#2980b9" }}>
                {mag.email}
              </td>
              <td style={tdStyle}>{mag.transactionId}</td>
              <td style={tdStyle}>
                <img
                  src={mag.signature}
                  alt="signature"
                  style={{
                    width: "70px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </>
  );
};

export default MagazineFormData;