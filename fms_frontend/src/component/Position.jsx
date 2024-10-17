import React, { useState } from 'react';
import axios from 'axios';
import PositionTable from './PositionTable';
import PositionForm from './PositionForm';
import PositionFormEdit from './PositionFormEdit';

const Position = () => {
  const [showTable, setShowTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handlePositionSubmit = event => {
    event.preventDefault();
    const body = {
      CompanyID: event.target[0].value,
      PositionName: event.target[1].value,
    };

    axios
      .post('http://localhost:4000/api/position', body, {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      })
      .then(res => {
        console.log(res);
        setShowTable(true);
        setShowTable(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAddPosition = () => {
    setShowTable(false);
  };

  const handleEditPosition = data => {
    setEditForm(true);
    setEditData(data);
  };

  const handleFormClose = () => {
    setShowTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handlePositionEditUpdate = (info, formData1, formData2) => {
    const body = {
      CompanyID: formData1,
      PositionName: formData2,
    };

    axios
      .put(`http://localhost:4000/api/position/${info._id}`, body, {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      })
      .then(res => {
        setShowTable(true);
        setEditForm(false);
        setShowTable(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      {showTable ? (
        editForm ? (
          <PositionFormEdit
            onPositionEditUpdate={handlePositionEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <PositionTable
            onAddPosition={handleAddPosition}
            onEditPosition={handleEditPosition}
          />
        )
      ) : (
        <PositionForm
          onPositionSubmit={handlePositionSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Position;
