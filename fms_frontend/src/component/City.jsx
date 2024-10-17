import React from 'react'
import { useState } from "react";
import axios from "axios";
import CityTable from "./CityTable.jsx";
import CityForm from "./CityForm.jsx";
import CityFormEdit from "./CityFormEdit.jsx";

const City = () => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const handleCitySubmit = async (event) => {
    event.preventDefault();
    const body = {
      StateID: event.target[1].value,
      CityName: event.target[2].value,
    };
    
    try {
      await axios.post("http://localhost:4000/api/city", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      });
      setIsTableVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCity = () => {
    setIsTableVisible(false);
  };

  const handleEditCity = (data) => {
    setIsEditFormVisible(true);
    setEditData(data);
  };

  const handleFormClose = () => {
    setIsTableVisible(true);
  };

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  const handleCityEditUpdate = async (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      StateID: newInfo.target[1].value,
      CityName: newInfo.target[2].value,
    };

    try {
      await axios.put(`http://localhost:4000/api/city/${info._id}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      });
      setIsEditFormVisible(false);
      setIsTableVisible(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isTableVisible ? (
        isEditFormVisible ? (
          <CityFormEdit
            onCityEditUpdate={handleCityEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <CityTable onAddCity={handleAddCity} onEditCity={handleEditCity} />
        )
      ) : (
        <CityForm onCitySubmit={handleCitySubmit} onFormClose={handleFormClose} />
      )}
    </>
  );
};

export default City;
