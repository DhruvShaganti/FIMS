import React, { useState } from 'react';
import axios from 'axios';
import StateTable from './StateTable.jsx';
import StateForm from './StateForm.jsx';
import StateFormEdit from './StateFormEdit.jsx';

const State = () => {
  const [view, setView] = useState('table'); // 'table', 'form', 'edit'
  const [editData, setEditData] = useState({});

  const handleStateSubmit = async (event) => {
    event.preventDefault();
    const countryID = event.target[0].value;
    const stateName = event.target[1].value;

    try {
      await axios.post("http://localhost:4000/api/state", { CountryID: countryID, StateName: stateName }, {
        headers: { authorization: localStorage.getItem("token") || "" }
      });
      setView('table');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddState = () => {
    setView('form');
  };

  const handleEditState = (data) => {
    setEditData(data);
    setView('edit');
  };

  const handleFormClose = () => {
    setView('table');
  };

  const handleEditFormClose = () => {
    setView('table');
  };

  const handleStateEditUpdate = async (info, newInfo) => {
    newInfo.preventDefault();
    const countryID = newInfo.target[0].value;
    const stateName = newInfo.target[1].value;

    try {
      await axios.put(`http://localhost:4000/api/state/${info["_id"]}`, { CountryID: countryID, StateName: stateName }, {
        headers: { authorization: localStorage.getItem("token") || "" }
      });
      setView('table');
    } catch (error) {
      console.error(error);
    }
    setEditData({});
  };

  return (
    <div>
      {view === 'table' && (
        <StateTable
          onAddState={handleAddState}
          onEditState={handleEditState}
        />
      )}
      {view === 'form' && (
        <StateForm
          onStateSubmit={handleStateSubmit}
          onFormClose={handleFormClose}
        />
      )}
      {view === 'edit' && (
        <StateFormEdit
          onStateEditUpdate={handleStateEditUpdate}
          onFormEditClose={handleEditFormClose}
          editData={editData}
        />
      )}
    </div>
  );
};

export default State;
