import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentForm = ({ editData, onDepartmentEditUpdate, onFormEditClose }) => {
  const [departmentData, setDepartmentData] = useState(editData["DepartmentName"]);
  const [companyInfo, setCompanyInfo] = useState([]);

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
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setDepartmentData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDepartmentEditUpdate(editData, e);
  };

  return (
    <div>
      <h2>Edit Department Details</h2>

      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>Company:</label>
          <select
            name="country"
            required
            defaultValue=""
            style={{
              padding: "5px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Select your option
            </option>
            {companyInfo.map((data, index) => (
              <option
                key={index}
                value={data["_id"]}
                selected={
                  editData["company"][0]["_id"] === data["_id"]
                }
              >
                {data["CompanyName"]}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>Department:</label>
          <input
            type="text"
            placeholder="Department"
            name="DepartmentName"
            required
            value={departmentData}
            onChange={handleChange}
            style={{
              padding: "5px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={onFormEditClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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
