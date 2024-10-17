import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentForm = ({ onDepartmentSubmit, onFormClose }) => {
  const [companyInfo, setCompanyInfo] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = () => {
    axios
      .get("http://localhost:4000/api/company", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        setCompanyInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDepartmentSubmit({ selectedCompany, departmentName });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Department Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>Company</label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="" disabled>Select your option</option>
            {companyInfo.map((company) => (
              <option key={company["_id"]} value={company["_id"]}>
                {company["CompanyName"]}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>Department</label>
          <input
            type="text"
            placeholder="Department"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onFormClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
