import React, { useState, useEffect } from "react";

const AdminPortalForm = ({ editData, onPortalEditUpdate, onStatusChange, onFormEditClose }) => {
  const [portalData, setPortalData] = useState(editData["PortalName"]);
  const [status, setStatus] = useState(editData["Status"]);

  useEffect(() => {
    setPortalData(editData["PortalName"]);
    setStatus(editData["Status"]);
  }, [editData]);

  const handleChange = (e) => {
    setPortalData(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onStatusChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPortalEditUpdate(editData, portalData);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Edit Portal Details</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="portalName" style={{ display: 'block', marginBottom: '5px' }}>
            Portal
          </label>
          <input
            type="text"
            id="portalName"
            name="PortalName"
            placeholder="Portal"
            required
            value={portalData}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <fieldset style={{ border: 'none', marginBottom: '20px' }}>
          <legend style={{ marginBottom: '10px' }}>Status</legend>
          <label style={{ marginRight: '15px' }}>
            <input
              type="radio"
              name="status"
              value="1"
              onChange={handleStatusChange}
              required
              checked={status === "1"}
            />
            Enable
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="0"
              onChange={handleStatusChange}
              required
              checked={status === "0"}
            />
            Disable
          </label>
        </fieldset>

        <div style={{ marginBottom: '15px' }}>
          <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
            Update
          </button>
          <button type="button" onClick={onFormEditClose} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPortalForm;
