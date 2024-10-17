import React from 'react'
const CountryForm = ({ onCountrySubmit, onFormClose }) => {
  return (
    <div>
      <h2>Add Country Details</h2>
      <form onSubmit={onCountrySubmit} style={{ margin: '20px 0' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px' }}>Country:</label>
          <input
            type="text"
            name="Country"
            placeholder="Country"
            required
            style={{
              padding: '5px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        
        <div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onFormClose}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;
