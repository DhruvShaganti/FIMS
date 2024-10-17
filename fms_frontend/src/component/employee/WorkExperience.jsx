import React, { useState } from 'react';
import axios from 'axios';
import WorkExperienceTable from './WorkExperienceTable';
import WorkExperienceForm from './WorkExperienceForm';
import WorkExperienceFormEdit from './WorkExperienceFormEdit';

const WorkExperience = ({ data, back }) => {
  const [isTable, setIsTable] = useState(true);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleWorkExperienceSubmit = (event) => {
    event.preventDefault();
    const body = {
      CompanyName: event.target[0].value,
      Designation: event.target[1].value,
      FromDate: event.target[2].value,
      ToDate: event.target[3].value,
    };

    axios
      .post(`http://localhost:4000/api/work-experience/${data["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTable(false);
        setIsTable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddWorkExperience = () => {
    setIsTable(false);
  };

  const handleEditWorkExperience = (info) => {
    setEditData(info);
    setIsEditForm(true);
  };

  const handleFormClose = () => {
    setIsTable(true);
  };

  const handleEditFormClose = () => {
    setIsEditForm(false);
  };

  const handleWorkExperienceEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      CompanyName: newInfo.target[0].value,
      Designation: newInfo.target[1].value,
      FromDate: newInfo.target[2].value,
      ToDate: newInfo.target[3].value,
    };

    axios
      .put(`http://localhost:4000/api/work-experience/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTable(false);
        setIsTable(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEditForm(false);
  };

  return (
    <>
      {isTable ? (
        isEditForm ? (
          <WorkExperienceFormEdit
            onWorkExperienceEditUpdate={handleWorkExperienceEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <WorkExperienceTable
            onAddWorkExperience={handleAddWorkExperience}
            onEditWorkExperience={handleEditWorkExperience}
            data={data}
            back={back}
          />
        )
      ) : (
        <WorkExperienceForm
          onWorkExperienceSubmit={handleWorkExperienceSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </>
  );
};

export default WorkExperience;
