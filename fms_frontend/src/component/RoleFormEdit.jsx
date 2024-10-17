import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Inline styles for the component
const styles = {
  container: {
    padding: '20px'
  },
  title: {
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

const RoleForm = ({ onRoleEditUpdate, onFormEditClose, editData }) => {
  const [roleData, setRoleData] = useState(editData.RoleName);
  const [companyInfo, setCompanyInfo] = useState([]);

  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/company', {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        });
        setCompanyInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCompanyInfo();
  }, []);

  const handleChange = (e) => {
    setRoleData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    onRoleEditUpdate(
      editData,
      formElements[0].value,
      formElements[1].value
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Role Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="company">
            Company
          </label>
          <select
            id="company"
            name="company"
            style={styles.select}
            defaultValue={editData.company[0]._id}
            required
          >
            <option value="" disabled>Select your option</option>
            {companyInfo.map((data) => (
              <option key={data._id} value={data._id}>
                {data.CompanyName}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="role">
            Role
          </label>
          <input
            id="role"
            type="text"
            placeholder="Role"
            name="RoleName"
            style={styles.input}
            required
            value={roleData}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" style={styles.button}>
            Update
          </button>
          <button
            type="button"
            style={styles.cancelButton}
            onClick={onFormEditClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
