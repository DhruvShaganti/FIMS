import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentTable = ({ onAddDepartment, onEditDepartment }) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartmentData();
  }, []);

  const loadDepartmentData = () => {
    axios
      .get("http://localhost:4000/api/department", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        const departments = response.data.map((data) => ({
          id: data["_id"],
          companyName: data["company"][0]["CompanyName"],
          departmentName: data["DepartmentName"]
        }));
        setDepartmentData(departments);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDepartmentDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/department/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadDepartmentData(); // Reload the data after delete
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department Details</h2>
      <button
        onClick={onAddDepartment}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Department
      </button>

      {!loading ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>Company</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Department</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Edit</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.map((data, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{data.companyName}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{data.departmentName}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button
                    onClick={() => onEditDepartment(data)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button
                    onClick={() => onDepartmentDelete(data.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
