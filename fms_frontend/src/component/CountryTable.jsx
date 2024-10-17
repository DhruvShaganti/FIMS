import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CountryTable = ({ onAddCountry, onEditCountry }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the country data from the API
  const loadCountryData = () => {
    axios
      .get("http://localhost:4000/api/country", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle deletion of a country
  const onCountryDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/country/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadCountryData();
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  // Load the country data when the component mounts
  useEffect(() => {
    loadCountryData();
  }, []);

  return (
    <div>
      <h2>Country Details</h2>
      <button onClick={onAddCountry}>
        Add
      </button>

      {!loading ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Country</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {countryData.map((country) => (
              <tr key={country._id}>
                <td>{country.CountryName}</td>
                <td>
                  <button onClick={() => onEditCountry(country)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => onCountryDelete(country._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryTable;
