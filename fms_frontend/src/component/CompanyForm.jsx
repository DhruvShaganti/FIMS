import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CompanyForm = ({ onCompanySubmit, onFormClose }) => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [filteredStateData, setFilteredStateData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);

  useEffect(() => {
    loadCountryInfo();
    loadStateInfo();
    loadCityInfo();
  }, []);

  const loadCountryInfo = () => {
    axios
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

  const loadStateInfo = () => {
    axios
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

  const loadCityInfo = () => {
    axios
      .get("http://localhost:4000/api/city", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCountryChange = (e) => {
    const currentCountry = e.target.value;
    const filteredState = stateData.filter(
      (data) => data["country"][0]["_id"] === currentCountry
    );
    setFilteredStateData(filteredState);
  };

  const onStateChange = (e) => {
    const currentState = e.target.value;
    const filteredCity = cityData.filter(
      (data) => data["state"][0]["_id"] === currentState
    );
    setFilteredCityData(filteredCity);
  };

  return (
    <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-700 mb-6">Add Company Details</h2>
    <form onSubmit={onCompanySubmit} class="space-y-6">
      <div>
        <label class="block text-gray-600 font-medium mb-2">Company Name</label>
        <input
          type="text"
          placeholder="Company Name"
          name="CompanyName"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Address</label>
        <textarea
          rows="3"
          placeholder="Address"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        ></textarea>
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Country</label>
        <select
          name="country"
          onChange={onCountryChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        >
          <option value="" disabled selected>Select your option</option>
          {countryData.map((data, index) => (
            <option key={index} value={data["_id"]}>{data["CountryName"]}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">State</label>
        <select
          name="state"
          required
          onChange={onStateChange}
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        >
          <option value="" disabled selected>Select your option</option>
          {filteredStateData.map((data, index) => (
            <option key={index} value={data["_id"]}>{data["StateName"]}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">City</label>
        <select
          name="city"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        >
          <option value="" disabled selected>Select your option</option>
          {filteredCityData.map((data, index) => (
            <option key={index} value={data["_id"]}>{data["CityName"]}</option>
          ))}
        </select>
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Postal Code</label>
        <input
          type="number"
          placeholder="Postal Code"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Website</label>
        <input
          type="text"
          placeholder="Website"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Contact Person</label>
        <input
          type="text"
          placeholder="Contact Person"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Contact No</label>
        <input
          type="text"
          placeholder="Contact No"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">Fax No</label>
        <input
          type="text"
          placeholder="Fax No"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">PAN No</label>
        <input
          type="text"
          placeholder="PAN No"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">GST No</label>
        <input
          type="text"
          placeholder="GST No"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-gray-600 font-medium mb-2">CIN No</label>
        <input
          type="text"
          placeholder="CIN No"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
        />
      </div>
  
      <div class="flex space-x-4">
        <button
          type="submit"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onFormClose}
          class="px-6 py-2 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500 focus:ring focus:ring-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default CompanyForm;
