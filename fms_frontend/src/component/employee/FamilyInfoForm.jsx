import React from "react";

const FamilyInfoForm = ({ onFamilyInfoSubmit, onFormClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onFamilyInfoSubmit(event);
  };

  return (
    <div>
      <h2>Add FamilyInfo Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Name
            <input type="text" placeholder="Name" required style={{ marginLeft: "8px" }} />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Relationship
            <input type="text" placeholder="Relationship" required style={{ marginLeft: "8px" }} />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            DOB
            <input type="date" required style={{ marginLeft: "8px" }} />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Occupation
            <input type="text" placeholder="Occupation" required style={{ marginLeft: "8px" }} />
          </label>
        </div>
        <div style={{ marginTop: "16px" }}>
          <button type="submit" style={{ marginRight: "8px" }}>Submit</button>
          <button type="reset" onClick={onFormClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FamilyInfoForm;
