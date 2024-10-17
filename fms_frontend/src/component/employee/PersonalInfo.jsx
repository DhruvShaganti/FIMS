import React, { useState } from "react";
import axios from "axios";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";

const PersonalInfo = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [editFormGender, setEditFormGender] = useState("");

  const handleEditPersonalInfo = (data) => {
    setEditForm(true);
    setEditData(data);
    setEditFormGender(data["Gender"]);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handlePersonalInfoEditUpdate = (info, event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    const body = {
      Gender: editFormGender,
      ContactNo: formElements[5].value,
      EmergencyContactNo: formElements[6].value,
      Email: formElements[7].value,
      PANcardNo: formElements[8].value,
      DOB: formElements[9].value,
      BloodGroup: formElements[10].value,
      Hobbies: formElements[11].value,
      PresentAddress: formElements[12].value,
      PermanetAddress: formElements[13].value,
    };

    axios
      .put(`http://localhost:4000/api/personal-info/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => console.error(err));

    setEditForm(false);
  };

  const handleEditFormGenderChange = (event) => {
    setEditFormGender(event.currentTarget.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      {table ? (
        editForm ? (
          <PersonalInfoFormEdit
            onPersonalInfoEditUpdate={handlePersonalInfoEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
            onGenderChange={handleEditFormGenderChange}
          />
        ) : (
          <PersonalInfoTable
            onAddPersonalInfo={props.onAddPersonalInfo}
            onEditPersonalInfo={handleEditPersonalInfo}
            data={props.data}
            back={props.back}
          />
        )
      ) : (
        <div />
      )}
    </div>
  );
};

export default PersonalInfo;
