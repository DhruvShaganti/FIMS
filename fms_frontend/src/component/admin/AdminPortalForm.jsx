import React from "react";

const AdminPortalForm = ({ onPortalSubmit, onStatusChange, onFormClose }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Add Portal Details</h2>
      <form onSubmit={onPortalSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="portal" style={{ display: 'block', marginBottom: '5px' }}>
            Portal
          </label>
          <input
            type="text"
            id="portal"
            name="Portal"
            placeholder="Portal"
            required
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
              onChange={onStatusChange}
              required
            />
            Enable
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="0"
              onChange={onStatusChange}
              required
            />
            Disable
          </label>
        </fieldset>

        <div style={{ marginBottom: '15px' }}>
          <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
            Submit
          </button>
          <button type="button" onClick={onFormClose} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPortalForm;
