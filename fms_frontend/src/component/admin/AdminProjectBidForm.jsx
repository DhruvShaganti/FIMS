import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProjectBidForm = ({ onProjectBidSubmit, onFormClose }) => {
  const [status, setStatus] = useState("");
  const [portalsInfo, setPortalsInfo] = useState([]);
  const [formData, setFormData] = useState({
    ProjectTitle: "",
    ProjectURL: "",
    ProjectDesc: "",
    Portal_ID: "",
    EstimatedTime: "",
    EstimatedCost: "",
    ResourceID: "",
    Status: "",
    Remark: ""
  });

  useEffect(() => {
    const loadPortalsInfo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/portal", {
          headers: { authorization: localStorage.getItem("token") || "" }
        });
        const activePortals = response.data.filter(data => data.Status === 1);
        setPortalsInfo(activePortals);
      } catch (error) {
        console.error(error);
      }
    };
    loadPortalsInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProjectBidSubmit(formData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Project Bid Details</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label>
          Project Title:
          <input
            type="text"
            name="ProjectTitle"
            value={formData.ProjectTitle}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Project URL:
          <input
            type="text"
            name="ProjectURL"
            value={formData.ProjectURL}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Project Description:
          <textarea
            name="ProjectDesc"
            value={formData.ProjectDesc}
            onChange={handleInputChange}
            required
            rows="3"
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Portal:
          <select
            name="Portal_ID"
            value={formData.Portal_ID}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          >
            {portalsInfo.map((portal, index) => (
              <option key={index} value={portal._id}>
                {portal.PortalName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estimated Time:
          <input
            type="number"
            name="EstimatedTime"
            value={formData.EstimatedTime}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Estimated Cost:
          <input
            type="number"
            name="EstimatedCost"
            value={formData.EstimatedCost}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <label>
          Resource:
          <select
            name="ResourceID"
            value={formData.ResourceID}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          >
            <option value="1">Resource1</option>
            <option value="2">Resource2</option>
            <option value="3">Resource3</option>
          </select>
        </label>
        <label>
          Status:
          <select
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
            required
            style={{ margin: "10px 0", padding: "8px" }}
          >
            <option value="1">Open</option>
            <option value="2">Close</option>
            <option value="3">Cancel</option>
            <option value="4">Award</option>
          </select>
        </label>
        <label>
          Remark:
          <textarea
            name="Remark"
            value={formData.Remark}
            onChange={handleInputChange}
            required
            rows="3"
            style={{ margin: "10px 0", padding: "8px" }}
          />
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none" }}>Submit</button>
          <button type="button" onClick={onFormClose} style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "#fff", border: "none" }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectBidForm;
