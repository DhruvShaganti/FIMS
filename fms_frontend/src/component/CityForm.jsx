import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CityForm = ({ onCitySubmit, onFormClose }) => {
  const [stateData, setStateData] = useState([]);
  const [filteredStateData, setFilteredStateData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  // const [filteredCountryData, setFCD] = useState([])

  const loadCountryInfo = async () => {
    await axios
      .get("http://localhost:4000/api/country", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadStateInfo = async () => {
    await axios
      .get("http://localhost:4000/api/state", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setStateData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  useEffect(() => {
    loadCountryInfo();
    loadStateInfo();
  }, []);


  const onCountryChange = (e) => {
    const currentCountry = e.target.value;
    const filteredState = stateData.filter(
      (data) => data["country"][0]["_id"] === currentCountry
    );
    setFilteredStateData(filteredState);
  };

  return (
    <div>
      <h2>Add City Details</h2>
      <div>
        <form onSubmit={onCitySubmit}>
          <label>Country:</label>
          <select name="country" id="country" onChange={onCountryChange}>
            <option value="" disabled selected>
                      Select your option
            </option>
            {countryData.map((data, index) => (
              <option value={data["_id"]} key={index}>{data["CountryName"]}</option>
            ))}
          </select><br />
          <label>State</label>
          <select name="state" id="state">
            <option value="" disabled selected>
              Select your option
            </option>
            {filteredStateData.map((data, index) => (
              <option value={data["_id"]} key={index}>{data["StateName"]}</option>
            ))}
          </select><br />
          <label>City</label>
          <input type="text" name="city" id="city" required/><br />
          <button type="submit">Submit</button>
          <button type="reset" onClick={onFormClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CityForm;
