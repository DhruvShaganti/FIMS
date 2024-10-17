import React from 'react'
import { useState } from "react";
import axios from "axios";
import CompanyTable from "./CompanyTable.jsx";
import CompanyForm from "./CompanyForm.jsx";
import CompanyFormEdit from "./CompanyFormEdit.jsx";

const Company = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleCompanySubmit = (event) => {
    event.preventDefault();
    setTable(true);

    const body = {
      CompanyName: event.target[0].value,
      Address: event.target[1].value,
      CityID: event.target[4].value,
      PostalCode: event.target[5].value,
      Website: event.target[6].value,
      Email: event.target[7].value,
      ContactPerson: event.target[8].value,
      ContactNo: event.target[9].value,
      FaxNo: event.target[10].value,
      PanNo: event.target[11].value,
      GSTNo: event.target[12].value,
      CINNo: event.target[13].value,
    };

    axios
      .post("http://localhost:4000/api/company", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddCompany = () => {
    setTable(false);
  };

  const handleEditCompany = (e) => {
    setEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handleCompanyEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();

    const body = {
      CompanyName: newInfo.target[0].value,
      Address: newInfo.target[1].value,
      CityID: newInfo.target[4].value,
      PostalCode: newInfo.target[5].value,
      Website: newInfo.target[6].value,
      Email: newInfo.target[7].value,
      ContactPerson: newInfo.target[8].value,
      ContactNo: newInfo.target[9].value,
      FaxNo: newInfo.target[10].value,
      PanNo: newInfo.target[11].value,
      GSTNo: newInfo.target[12].value,
      CINNo: newInfo.target[13].value,
    };

    axios
      .put(`http://localhost:4000/api/company/${info._id}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditForm(false);
  };

  return (
    <>
      {table ? (
        editForm ? (
          <CompanyFormEdit
            onCompanyEditUpdate={handleCompanyEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <CompanyTable onAddCompany={handleAddCompany} onEditCompany={handleEditCompany} />
        )
      ) : (
        <CompanyForm onCompanySubmit={handleCompanySubmit} onFormClose={handleFormClose} />
      )}
    </>
  );
};

export default Company;
