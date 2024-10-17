import React from 'react'
import { useState } from "react";
import axios from "axios";
import DepartmentTable from "./DepartmentTable.jsx";
import DepartmentForm from "./DepartmentForm.jsx";
import DepartmentFormEdit from "./DepartmentFormEdit.jsx";

const Department = () => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const handleDepartmentSubmit = (event) => {
    event.preventDefault();
    const companyId = event.target[0].value;
    const departmentName = event.target[1].value;

    const body = {
      CompanyID: companyId,
      DepartmentName: departmentName,
    };

    axios
      .post("http://localhost:4000/api/department", body, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then(() => {
        setIsTableVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddDepartment = () => {
    setIsTableVisible(false);
  };

  const handleEditDepartment = (data) => {
    setEditData(data);
    setIsEditFormVisible(true);
  };

  const handleFormClose = () => {
    setIsTableVisible(true);
  };

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  const handleDepartmentEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const updatedCompanyId = newInfo.target[0].value;
    const updatedDepartmentName = newInfo.target[1].value;

    const body = {
      CompanyID: updatedCompanyId,
      DepartmentName: updatedDepartmentName,
    };

    axios
      .put(`http://localhost:4000/api/department/${info["_id"]}`, body, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then(() => {
        setIsTableVisible(true);
        setIsEditFormVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {isTableVisible ? (
        isEditFormVisible ? (
          <DepartmentFormEdit
            onDepartmentEditUpdate={handleDepartmentEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <DepartmentTable
            onAddDepartment={handleAddDepartment}
            onEditDepartment={handleEditDepartment}
          />
        )
      ) : (
        <DepartmentForm
          onDepartmentSubmit={handleDepartmentSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Department;
