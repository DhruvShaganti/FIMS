import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CityTable = (props) => {
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCityData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/city", {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      setCityData(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error loading city data", error);
    }
  };

  const handleCityDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await axios
        .delete(`http://localhost:4000/api/city/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => loadCityData())
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  useEffect(() => {
    loadCityData();
  }, []);

  return (
    <div>
      <h2>City Details</h2>
      <button onClick={props.onAddCity} style={{ marginBottom: "20px" }}>
        + Add
      </button>

      {!loading ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cityData.map((city) => (
              <tr key={city._id}>
                <td>{city.state[0].country[0].CountryName}</td>
                <td>{city.state[0].StateName}</td>
                <td>{city.CityName}</td>
                <td>
                  <button onClick={() => props.onEditCity(city)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleCityDelete(city._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: 45 }}>Loading...</div>
      )}
    </div>
  );
};

export default CityTable;
