import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeForm from "./EmployeeForm.jsx";
import EmployeeFormEdit from "./EmployeeFormEdit.jsx";
import EmployeeInfo from "./EmployeeInfo.jsx";
import PersonalInfo from "./employee/PersonalInfo.jsx";
import Education from "./employee/Education.jsx";
import FamilyInfo from "./employee/FamilyInfo.jsx";
import WorkExperience from "./employee/WorkExperience.jsx";

const Employee = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [addFormGender, setAddFormGender] = useState("");
  const [editFormGender, setEditFormGender] = useState("");
  const [empInfo, setEmpInfo] = useState({});
  const [empInfoBool, setEmpInfoBool] = useState(false);

  const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    setTable(true);

    const body = {
      Email: event.target[0].value,
      Password: event.target[1].value,
      Account: event.target[2].value,
      RoleID: event.target[3].value,
      Gender: addFormGender,
      FirstName: event.target[6].value,
      MiddleName: event.target[7].value,
      LastName: event.target[8].value,
      DOB: event.target[9].value,
      ContactNo: event.target[10].value,
      EmployeeCode: event.target[11].value,
      DepartmentID: event.target[12].value,
      PositionID: event.target[13].value,
      DateOfJoining: event.target[14].value,
      TerminateDate: event.target[15].value,
    };

    axios
      .post("http://localhost:4000/api/employee", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => console.log(err));
  };

  const handleAddEmployee = () => setTable(false);

  const handleEditEmployee = (e) => {
    setEditForm(true);
    setEditData(e);
    setEditFormGender(e.Gender);
  };

  const handleFormClose = () => setTable(true);

  const handleEditFormClose = () => setEditForm(false);

  const handleEmployeeEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();

    const body = {
      Email: newInfo.target[0].value,
      Account: newInfo.target[1].value,
      RoleID: newInfo.target[2].value,
      Gender: editFormGender,
      FirstName: newInfo.target[5].value,
      MiddleName: newInfo.target[6].value,
      LastName: newInfo.target[7].value,
      DOB: newInfo.target[8].value,
      ContactNo: newInfo.target[9].value,
      EmployeeCode: newInfo.target[10].value,
      DepartmentID: newInfo.target[11].value,
      PositionID: newInfo.target[12].value,
      DateOfJoining: newInfo.target[13].value,
      TerminateDate: newInfo.target[14].value,
    };

    axios
      .put(`http://localhost:4000/api/employee/${info._id}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => console.log(err));

    setEditForm(false);
  };

  const handleEmpInfo = (e) => {
    setEmpInfo(e);
    setEmpInfoBool(true);
  };

  const handleBack = () => setEmpInfoBool(false);

  const handleAddFormGenderChange = (e) => setAddFormGender(e.currentTarget.value);

  const handleEditFormGenderChange = (e) => setEditFormGender(e.currentTarget.value);

  return (
    // <div>
    //   Hello
    // </div>
    <Routes>
      <Route
        exact
        path="/hr/employee"
        render={() => (
          <>
            {table ? (
              editForm ? (
                <EmployeeFormEdit
                  onEmployeeEditUpdate={handleEmployeeEditUpdate}
                  onFormEditClose={handleEditFormClose}
                  editData={editData}
                  onGenderChange={handleEditFormGenderChange}
                />
              ) : (
                !empInfoBool ? (
                  <EmployeeTable
                    onAddEmployee={handleAddEmployee}
                    onEditEmployee={handleEditEmployee}
                    onEmpInfo={handleEmpInfo}
                  />
                ) : (
                  <EmployeeInfo data={empInfo} onBack={handleBack} />
                )
              )
            ) : (
              <EmployeeForm
                onEmployeeSubmit={handleEmployeeSubmit}
                onFormClose={handleFormClose}
                onGenderChange={handleAddFormGenderChange}
              />
            )}
          </>
        )}
      />
      <Route
        exact
        path="/hr/employee/info/personal-info"
        render={() => <PersonalInfo data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/education"
        render={() => <Education data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/family-info"
        render={() => <FamilyInfo data={empInfo} back={true} />}
      />
      <Route
        exact
        path="/hr/employee/info/work-experience"
        render={() => <WorkExperience data={empInfo} back={true} />}
      />
    </Routes>
  );
};

export default Employee;
