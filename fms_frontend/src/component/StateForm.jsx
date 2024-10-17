import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateForm = ({ onStateSubmit, onFormClose }) => {
  const [countryInfo, setCountryInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stateName, setStateName] = useState('');

  useEffect(() => {
    const loadCountryInfo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/country", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        setCountryInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    loadCountryInfo();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onStateSubmit(event);
  };

  return (
    <div>
      <h2>Add State Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="" disabled>Select your option</option>
            {countryInfo.map((data) => (
              <option key={data["_id"]} value={data["_id"]}>{data["CountryName"]}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="State"
            placeholder="State"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onFormClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StateForm;
