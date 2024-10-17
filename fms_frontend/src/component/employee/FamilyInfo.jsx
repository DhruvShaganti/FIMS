import React, { useState } from "react";
import axios from "axios";
import FamilyInfoTable from "./FamilyInfoTable";
import FamilyInfoForm from "./FamilyInfoForm";
import FamilyInfoFormEdit from "./FamilyInfoFormEdit";

const FamilyInfo = ({ data, back }) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [editFormGender, setEditFormGender] = useState("");

  const handleFamilyInfoSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);

    const body = {
      Name: event.target[0].value,
      Relationship: event.target[1].value,
      DOB: event.target[2].value,
      Occupation: event.target[3].value,
    };

    axios
      .post(`http://localhost:4000/api/family-info/${data["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true); // Show the table after submission
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddFamilyInfo = () => {
    console.log("clicked1");
    setTable(false);
  };

  const handleEditFamilyInfo = (info) => {
    console.log(info);
    console.log("clicked6");
    setEditForm(true);
    setEditData(info);
    setEditFormGender(info["Gender"]);
  };

  const handleFormClose = () => {
    console.log("clicked1");
    setTable(true);
  };

  const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false);
  };

  const handleFamilyInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);

    const body = {
      Name: newInfo.target[0].value,
      Relationship: newInfo.target[1].value,
      DOB: newInfo.target[2].value,
      Occupation: newInfo.target[3].value,
    };

    console.log("update", body);

    axios
      .put(`http://localhost:4000/api/family-info/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true); // Show the table after updating
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
          <FamilyInfoFormEdit
            onFamilyInfoEditUpdate={handleFamilyInfoEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <FamilyInfoTable
            onAddFamilyInfo={handleAddFamilyInfo}
            onEditFamilyInfo={handleEditFamilyInfo}
            data={data}
            back={back}
          />
        )
      ) : (
        <FamilyInfoForm
          onFamilyInfoSubmit={handleFamilyInfoSubmit}
          onFormClose={handleFormClose}
          onGenderChange={handleAddFormGenderChange} // Assuming this function is needed in FamilyInfoForm
        />
      )}
    </>
  );
};

export default FamilyInfo;
