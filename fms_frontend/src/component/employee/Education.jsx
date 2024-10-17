import React, { useState } from "react";
import axios from "axios";
import EducationTable from "./EducationTable.jsx";
import EducationForm from "./EducationForm.jsx";
import EducationFormEdit from "./EducationFormEdit.jsx";

const Education = ({ data, back }) => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEducationSubmit = (event) => {
    event.preventDefault();
    const body = {
      SchoolUniversity: event.target[0].value,
      Degree: event.target[1].value,
      Grade: event.target[2].value,
      PassingOfYear: event.target[3].value,
    };

    axios
      .post(`http://localhost:4000/api/education/${data["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTableVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddEducation = () => {
    setIsTableVisible(false);
  };

  const handleEditEducation = (educationData) => {
    setEditData(educationData);
    setIsEditFormVisible(true);
  };

  const handleFormClose = () => {
    setIsTableVisible(true);
  };

  const handleEditFormClose = () => {
    setIsEditFormVisible(false);
  };

  const handleEducationEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      SchoolUniversity: newInfo.target[0].value,
      Degree: newInfo.target[1].value,
      Grade: newInfo.target[2].value,
      PassingOfYear: newInfo.target[3].value,
    };

    axios
      .put(`http://localhost:4000/api/education/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTableVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEditFormVisible(false);
  };

  return (
    <>
      {isTableVisible ? (
        isEditFormVisible ? (
          <EducationFormEdit
            onEducationEditUpdate={handleEducationEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <EducationTable
            onAddEducation={handleAddEducation}
            onEditEducation={handleEditEducation}
            data={data}
            back={back}
          />
        )
      ) : (
        <EducationForm
          onEducationSubmit={handleEducationSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </>
  );
};

export default Education;
