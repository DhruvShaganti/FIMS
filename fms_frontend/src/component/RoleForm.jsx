import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleForm = ({ onRoleSubmit, onFormClose }) => {
  const [companyInfo, setCompanyInfo] = useState([]);

  // Load company info from API
  const loadCompanyInfo = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/company', {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      });
      setCompanyInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Role Details</h2>
      <form onSubmit={onRoleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="company" style={{ display: 'block', marginBottom: '5px' }}>
            Company
          </label>
          <select id="company" name="company" required style={{ width: '100%', padding: '8px' }}>
            <option value="" disabled selected>
              Select your option
            </option>
            {companyInfo.map((data) => (
              <option key={data._id} value={data._id}>
                {data.CompanyName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>
            Role
          </label>
          <input
            type="text"
            id="role"
            name="Role"
            placeholder="Role"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Submit
          </button>
        </div>

        <div>
          <button type="button" onClick={onFormClose} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
