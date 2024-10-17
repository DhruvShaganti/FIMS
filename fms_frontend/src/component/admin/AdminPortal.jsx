import React, { useState } from "react";
import axios from "axios";
import AdminPortalTable from "./AdminPortalTable";
import AdminPortalForm from "./AdminPortalForm";
import AdminPortalFormEdit from "./AdminPortalFormEdit";

const AdminPortal = () => {
  const [view, setView] = useState('table'); // 'table', 'add', 'edit'
  const [editData, setEditData] = useState({});
  const [addFormStatus, setAddFormStatus] = useState('');
  const [editFormStatus, setEditFormStatus] = useState('');

  const handlePortalSubmit = event => {
    event.preventDefault();
    const portalName = event.target[0].value;
    const status = addFormStatus;

    const body = {
      PortalName: portalName,
      Status: status
    };

    axios
      .post("http://localhost:4000/api/admin/portal", body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(() => {
        setView('table');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleAddPortal = () => {
    setView('add');
  };

  const handleEditPortal = (data) => {
    setEditData(data);
    setEditFormStatus(data.Status);
    setView('edit');
  };

  const handleFormClose = () => {
    setView('table');
  };

  const handleEditFormClose = () => {
    setView('table');
  };

  const handleAddFormStatusChange = (e) => {
    setAddFormStatus(e.currentTarget.value);
  };

  const handleEditFormStatusChange = (e) => {
    setEditFormStatus(e.currentTarget.value);
  };

  const handlePortalEditUpdate = (info, formData) => {
    const body = {
      _id: info["_id"],
      PortalName: formData,
      Status: editFormStatus,
      ID: info["ID"]
    };

    axios
      .put(`http://localhost:4000/api/admin/portal/${info["ID"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(() => {
        setView('table');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      {view === 'table' && (
        <AdminPortalTable
          onAddPortal={handleAddPortal}
          onEditPortal={handleEditPortal}
        />
      )}
      {view === 'add' && (
        <AdminPortalForm
          onPortalSubmit={handlePortalSubmit}
          onFormClose={handleFormClose}
          onStatusChange={handleAddFormStatusChange}
        />
      )}
      {view === 'edit' && (
        <AdminPortalFormEdit
          onPortalEditUpdate={handlePortalEditUpdate}
          onFormEditClose={handleEditFormClose}
          editData={editData}
          onStatusChange={handleEditFormStatusChange}
        />
      )}
    </div>
  );
};

export default AdminPortal;
