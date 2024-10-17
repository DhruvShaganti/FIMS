import React, { useState } from 'react';

const WorkExperienceFormEdit = ({ editData, onWorkExperienceEditUpdate, onFormEditClose }) => {
  const [companyName, setCompanyName] = useState(editData.CompanyName || '');
  const [designation, setDesignation] = useState(editData.Designation || '');
  const [fromDate, setFromDate] = useState(editData.FromDate.slice(0, 10) || '');
  const [toDate, setToDate] = useState(editData.ToDate.slice(0, 10) || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onWorkExperienceEditUpdate(editData, event);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Work Experience Details</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="companyName" style={{ display: 'block', marginBottom: '5px' }}>Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="designation" style={{ display: 'block', marginBottom: '5px' }}>Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="fromDate" style={{ display: 'block', marginBottom: '5px' }}>From Date</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="toDate" style={{ display: 'block', marginBottom: '5px' }}>To Date</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={onFormEditClose}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceFormEdit;
