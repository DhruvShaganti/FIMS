import React, { useState } from 'react';
import axios from 'axios';
import LeaveApplicationHRTable from './LeaveApplicationHRTable';
import LeaveApplicationHRFormEdit from './LeaveApplicationHRFormEdit';

const LeaveApplicationHR = ({ data }) => {
  const [isTable, setIsTable] = useState(true);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleLeaveApplicationHRSubmit = (event) => {
    event.preventDefault();

    const body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Reasonforleave: event.target[3].value,
      Status: event.target[4].value,
    };

    axios
      .post(`http://localhost:4000/api/leave-application-hr/${data["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTable(false);
        setIsTable(true);
      })
      .catch(console.error);
  };

  const handleAddLeaveApplicationHR = () => {
    setIsTable(false);
  };

  const handleEditLeaveApplicationHR = (e) => {
    setIsEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
    setIsTable(true);
  };

  const handleEditFormClose = () => {
    setIsEditForm(false);
  };

  const handleLeaveApplicationHREditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      Status: newInfo.target[4].value,
    };

    axios
      .put(`http://localhost:4000/api/leave-application-hr/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setIsTable(false);
        setIsTable(true);
      })
      .catch(console.error);

    setIsEditForm(false);
  };

  return (
    <div>
      {
        isEditForm ? (
          <LeaveApplicationHRFormEdit
            onLeaveApplicationHREditUpdate={handleLeaveApplicationHREditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <LeaveApplicationHRTable
            onAddLeaveApplicationHR={handleAddLeaveApplicationHR}
            onEditLeaveApplicationHR={handleEditLeaveApplicationHR}
            data={data}
          />
        )}
    </div>
  );
};

export default LeaveApplicationHR;
