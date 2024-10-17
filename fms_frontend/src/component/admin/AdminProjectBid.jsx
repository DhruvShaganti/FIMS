import React, { useState } from "react";
import axios from "axios";
import AdminProjectBidTable from "./AdminProjectBidTable.jsx";
import AdminProjectBidForm from "./AdminProjectBidForm.jsx";
import AdminProjectBidFormEdit from "./AdminProjectBidFormEdit.jsx";

const AdminProjectBid = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleProjectBidSubmit = (event) => {
    event.preventDefault();
    const body = {
      ProjectTitle: event.target[0].value,
      ProjectURL: event.target[1].value,
      ProjectDesc: event.target[2].value,
      Portal_ID: event.target[3].value,
      EstimatedTime: event.target[4].value,
      EstimatedCost: event.target[5].value,
      ResourceID: event.target[6].value,
      Status: event.target[7].value,
      Remark: event.target[8].value,
    };

    axios
      .post("http://localhost:4000/api/admin/project-bid", body, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then((res) => {
        setTable(true);
      })
      .catch((err) => console.log(err));
  };

  const handleAddProjectBid = () => {
    setTable(false);
  };

  const handleEditProjectBid = (data) => {
    setEditForm(true);
    setEditData(data);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handleProjectBidEditUpdate = (info, editInfo) => {
    const body = {
      ProjectTitle: editInfo.target[0].value,
      ProjectURL: editInfo.target[1].value,
      ProjectDesc: editInfo.target[2].value,
      Portal_ID: editInfo.target[3].value,
      EstimatedTime: editInfo.target[4].value,
      EstimatedCost: editInfo.target[5].value,
      ResourceID: editInfo.target[6].value,
      Status: editInfo.target[7].value,
      Remark: editInfo.target[8].value,
    };

    axios
      .put("http://localhost:4000/api/admin/project-bid/" + info["_id"], body, {
        headers: { authorization: localStorage.getItem("token") || "" },
      })
      .then((res) => {
        setTable(true);
      })
      .catch((err) => console.log(err));

    setEditForm(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      {table ? (
        editForm ? (
          <AdminProjectBidFormEdit
            onProjectBidEditUpdate={handleProjectBidEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <AdminProjectBidTable
            onAddProjectBid={handleAddProjectBid}
            onEditProjectBid={handleEditProjectBid}
          />
        )
      ) : (
        <AdminProjectBidForm
          onProjectBidSubmit={handleProjectBidSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default AdminProjectBid;
