import React, { useState } from "react";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationEmpTable";
import LeaveApplicationEmpForm from "./LeaveApplicationEmpForm";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationEmpFormEdit";

const LeaveApplicationEmp = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleLeaveApplicationEmpSubmit = (event) => {
    event.preventDefault();
    const body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Reasonforleave: event.target[3].value,
      Status: event.target[4].value,
    };
    axios
      .post(`http://localhost:4000/api/leave-application-emp/${props.data["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddLeaveApplicationEmp = () => {
    setTable(false);
  };

  const handleEditLeaveApplicationEmp = (data) => {
    setEditForm(true);
    setEditData(data);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Reasonforleave: newInfo.target[3].value,
      Status: newInfo.target[4].value,
    };
    axios
      .put(`http://localhost:4000/api/leave-application-emp/${info["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(() => {
        setTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
    setEditForm(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {table ? (
        editForm ? (
          <LeaveApplicationEmpFormEdit
            onLeaveApplicationEmpEditUpdate={handleLeaveApplicationEmpEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <div>
            <h2>
              Leave Applications for {props.data["FirstName"]} {props.data["LastName"]}
            </h2>
            <button
              style={{ padding: "10px", margin: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
              onClick={handleAddLeaveApplicationEmp}
            >
              Add Leave Application
            </button>
              <LeaveApplicationEmpTable
                onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
                data={props.data}
              />
          </div>
        )
      ) : (
        <LeaveApplicationEmpForm
          onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default LeaveApplicationEmp;
