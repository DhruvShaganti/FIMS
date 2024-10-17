import React from 'react'
import { useEffect, useState } from "react"
import axios from 'axios'

export default function CityFormEdit(props) {
    const [cityData, setCityData] = useState(props.editData['CityName'])
    const [stateData, setStateData] = useState([])
    const [filteredStateData, setFSD] = useState([])
    const [countryData, setCountryData] = useState([])
    const [filteredCountryData, setFCD] = useState([])

    const onChange = (e) => setCityData(e.target.value)

    const loadCountryInfo = async () => {
        await axios
          .get("http://localhost:4000/api/country", {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then(response => {
            this.setCountryData(response.data );
          })
          .catch(error => {
            console.log(error);
          });
      };
    const loadStateInfo = async () => {
        await axios
            .get("http://localhost:4000/api/state", {
                headers: {
                    authorization: localStorage.getItem("token") || ""
                }
            }
        )
        .then(response => {
            setStateData(response.data)
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        loadCountryInfo();
        loadStateInfo();
    }, [])

    const onCountryChange = (e) => {
        console.log(e.target.value);
        let currentCountry = e.target.value;
        let filteredState = stateData.filter(
            data => data["country"][0]["_id"] == currentCountry
        );
        setFSD(filteredState);
    }

    const onSelectCountry = (e, data) => {
        return props.editData['state'][0]['country']
    }
    return (
        <div>
            <h2>Edit City Deatils</h2>
            <form action="" onSubmit={props.onCityEditUpdate}>
                <label>Country</label>
                <select name="country" id="country">
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
                        <option value={data["_id"]} selected={this.props.editData["state"][0]["_id"] == data["_id"]} key={index}>
                        {data["StateName"]}
                        </option>
                    ))}
                </select><br />
                <label>City</label>
                <input type="text" name="city" id="city" value={cityData} onChange={onChange}/><br />
                <button type="submit">Submit</button>
                <button type="reset" onClick={onFormEditClose}>Cancel</button>
            </form>
        </div>
    )
}
