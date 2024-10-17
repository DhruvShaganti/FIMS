import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const CompanyFormEdit = ({ editData, onCompanyEditUpdate, onFormEditClose }) => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [filteredStateData, setFilteredStateData] = useState([]);
  const [filteredCityData, setFilteredCityData] = useState([]);
  
  const [CompanyNameData, setCompanyNameData] = useState(editData.CompanyName);
  const [AddressData, setAddressData] = useState(editData.Address);
  const [PostalCodeData, setPostalCodeData] = useState(editData.PostalCode);
  const [WebsiteData, setWebsiteData] = useState(editData.Website);
  const [EmailData, setEmailData] = useState(editData.Email);
  const [ContactPersonData, setContactPersonData] = useState(editData.ContactPerson);
  const [ContactNoData, setContactNoData] = useState(editData.ContactNo);
  const [FaxNoData, setFaxNoData] = useState(editData.FaxNo);
  const [PanNoData, setPanNoData] = useState(editData.PanNo);
  const [GSTNoData, setGSTNoData] = useState(editData.GSTNo);
  const [CINNoData, setCINNoData] = useState(editData.CINNo);

  useEffect(() => {
    async function fetch(){
        await axios
        .get("http://localhost:4000/api/country", {
            headers: { authorization: localStorage.getItem("token") || "" }
        })
        .then((response) => setCountryData(response.data))
        .catch((error) => console.log(error));

        await axios
        .get("http://localhost:4000/api/state", {
            headers: { authorization: localStorage.getItem("token") || "" }
        })
        .then((response) => setStateData(response.data))
        .catch((error) => console.log(error));

        await axios
        .get("http://localhost:4000/api/city", {
            headers: { authorization: localStorage.getItem("token") || "" }
        })
        .then((response) => setCityData(response.data))
        .catch((error) => console.log(error));
    }
    fetch()
  }, []);

  const handleCountryChange = (e) => {
    const currentCountry = e.target.value;
    const filteredState = stateData.filter(
      (data) => data.country[0]._id === currentCountry
    );
    setFilteredStateData(filteredState);
  };

  const handleStateChange = (e) => {
    const currentState = e.target.value;
    const filteredCity = cityData.filter(
      (data) => data.state[0]._id === currentState
    );
    setFilteredCityData(filteredCity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompanyEditUpdate({
      CompanyName: CompanyNameData,
      Address: AddressData,
      PostalCode: PostalCodeData,
      Website: WebsiteData,
      Email: EmailData,
      ContactPerson: ContactPersonData,
      ContactNo: ContactNoData,
      FaxNo: FaxNoData,
      PanNo: PanNoData,
      GSTNo: GSTNoData,
      CINNo: CINNoData
    }, e);
  };

  return (
    <div>
      <h2>Edit Project Bid Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            value={CompanyNameData}
            onChange={(e) => setCompanyNameData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            rows="3"
            placeholder="Address"
            value={AddressData}
            onChange={(e) => setAddressData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Country</label>
          <select onChange={handleCountryChange} required>
            <option value="" disabled selected>
              Select your country
            </option>
            {countryData.map((data, index) => (
              <option key={index} value={data._id}>
                {data.CountryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>State</label>
          <select onChange={handleStateChange} required>
            <option value="" disabled selected>
              Select your state
            </option>
            {filteredStateData.map((data, index) => (
              <option key={index} value={data._id}>
                {data.StateName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>City</label>
          <select required>
            <option value="" disabled selected>
              Select your city
            </option>
            {filteredCityData.map((data, index) => (
              <option key={index} value={data._id}>
                {data.CityName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Postal Code</label>
          <input
            type="number"
            placeholder="Postal Code"
            value={PostalCodeData}
            onChange={(e) => setPostalCodeData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Website</label>
          <input
            type="text"
            placeholder="Website"
            value={WebsiteData}
            onChange={(e) => setWebsiteData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={EmailData}
            onChange={(e) => setEmailData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contact Person</label>
          <input
            type="text"
            placeholder="Contact Person"
            value={ContactPersonData}
            onChange={(e) => setContactPersonData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contact No</label>
          <input
            type="text"
            placeholder="Contact No"
            value={ContactNoData}
            onChange={(e) => setContactNoData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fax No</label>
          <input
            type="text"
            placeholder="Fax No"
            value={FaxNoData}
            onChange={(e) => setFaxNoData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>PAN No</label>
          <input
            type="text"
            placeholder="PAN No"
            value={PanNoData}
            onChange={(e) => setPanNoData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>GST No</label>
          <input
            type="text"
            placeholder="GST No"
            value={GSTNoData}
            onChange={(e) => setGSTNoData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>CIN No</label>
          <input
            type="text"
            placeholder="CIN No"
            value={CINNoData}
            onChange={(e) => setCINNoData(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={onFormEditClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CompanyFormEdit;
