import React, { useState } from 'react';
import axios from 'axios';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import RoleFormEdit from './RoleFormEdit';

const Role = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleRoleSubmit = async (event) => {
    event.preventDefault();
    const companyId = event.target[0].value;
    const roleName = event.target[1].value;

    const body = {
      CompanyID: companyId,
      RoleName: roleName,
    };

    try {
      await axios.post('http://localhost:4000/api/role', body, {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      });
      setTable(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRole = () => {
    setTable(false);
  };

  const handleEditRole = (roleData) => {
    setEditData(roleData);
    setEditForm(true);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handleRoleEditUpdate = async (info, formData1, formData2) => {
    const body = {
      CompanyID: formData1,
      RoleName: formData2,
    };

    try {
      await axios.put(`http://localhost:4000/api/role/${info._id}`, body, {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      });
      setEditForm(false);
      setTable(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {table ? (
        editForm ? (
          <RoleFormEdit
            onRoleEditUpdate={handleRoleEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <RoleTable
            onAddRole={handleAddRole}
            onEditRole={handleEditRole}
          />
        )
      ) : (
        <RoleForm
          onRoleSubmit={handleRoleSubmit}
          onFormClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Role;
