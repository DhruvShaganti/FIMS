import React, { useState, useEffect } from "react";

const FamilyInfoForm = ({ editData, onFamilyInfoEditUpdate, onFormEditClose }) => {
  const [nameData, setNameData] = useState(editData["Name"]);
  const [relationshipData, setRelationshipData] = useState(editData["Relationship"]);
  const [dobData, setDobData] = useState(editData["DOB"].slice(0, 10));
  const [occupationData, setOccupationData] = useState(editData["Occupation"]);

  useEffect(() => {
    setNameData(editData["Name"]);
    setRelationshipData(editData["Relationship"]);
    setDobData(editData["DOB"].slice(0, 10));
    setOccupationData(editData["Occupation"]);
  }, [editData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFamilyInfoEditUpdate(editData, event);
  };

  return (
    <div>
      <h2>Edit FamilyInfo Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Name
            <input
              type="text"
              placeholder="Name"
              required
              value={nameData}
              onChange={(e) => setNameData(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Relationship
            <input
              type="text"
              placeholder="Relationship"
              required
              value={relationshipData}
              onChange={(e) => setRelationshipData(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            DOB
            <input
              type="date"
              required
              value={dobData}
              onChange={(e) => setDobData(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label>
            Occupation
            <input
              type="text"
              placeholder="Occupation"
              required
              value={occupationData}
              onChange={(e) => setOccupationData(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "16px" }}>
          <button type="submit" style={{ marginRight: "8px" }}>Update</button>
          <button type="reset" onClick={onFormEditClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default FamilyInfoForm;
