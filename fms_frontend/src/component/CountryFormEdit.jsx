import React from 'react'
import { useState } from "react";

const CountryFormEdit = ({ editData, onCountryEditUpdate, onFormEditClose }) => {
  const [countryData, setCountryData] = useState(editData["CountryName"]);

  const handleChange = (e) => {
    setCountryData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCountryEditUpdate(editData, e);
  };

  return (
    <div>
      <h2>Edit Country Details</h2>

      <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>Country:</label>
          <input
            type="text"
            placeholder="Country"
            name="CountryName"
            required
            value={countryData}
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

export default CountryFormEdit;
