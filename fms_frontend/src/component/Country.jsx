import React from 'react'
import { useState } from "react";
import axios from "axios";
import CountryTable from "./CountryTable.jsx";
import CountryForm from "./CountryForm.jsx";
import CountryFormEdit from "./CountryFormEdit.jsx";

const Country = () => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editData, setEditData] = useState({});

  // Handle submission of a new country
  const handleCountrySubmit = (event) => {
    event.preventDefault();
    const countryName = event.target[0].value;

    const body = {
      CountryName: countryName
    };

    axios
      .post("http://localhost:4000/api/country", body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(() => {
        setIsTableVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Handle when the user clicks to add a new country
  const handleAddCountry = () => {
    setIsTableVisible(false);
  };

  // Handle when the user clicks to edit a country
  const handleEditCountry = (data) => {
    setIsEditFormVisible(true);
    setEditData(data);
  };

  // Handle closing the form for adding a country
  const handleFormClose = () => {
    setIsTableVisible(true);
  };

  // Handle closing the edit form
  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  // Handle updating an existing country
  const handleCountryEditUpdate = (info, newInfo) => {
    const updatedCountryName = newInfo.target[0].value;

    const body = {
      CountryName: updatedCountryName
    };

    axios
      .put(`http://localhost:4000/api/country/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(() => {
        setIsTableVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });

    setIsEditFormVisible(false);
  };

  return (
    <div>
      {isTableVisible ? (
        isEditFormVisible ? (
          <CountryFormEdit
            onCountryEditUpdate={handleCountryEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <CountryTable
            onAddCountry={handleAddCountry}
            onEditCountry={handleEditCountry}
          />
        )
      ) : (
        <CountryForm
          onCountrySubmit={handleCountrySubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Country;
