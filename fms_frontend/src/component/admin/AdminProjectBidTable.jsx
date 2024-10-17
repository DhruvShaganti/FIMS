import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProjectBidTable = ({ onEditProjectBid, onAddProjectBid }) => {
  const [projectBidData, setProjectBidData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectBidData();
  }, []);

  const loadProjectBidData = () => {
    axios
      .get("http://localhost:4000/api/admin/project-bid", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const data = response.data.map((item) => ({
          ...item,
          PortalName: item.portals?.[0]?.PortalName || "N/A",
        }));
        setProjectBidData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onProjectBidDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/admin/project-bid/${id}`, {
          headers: { authorization: localStorage.getItem("token") || "" },
        })
        .then(() => {
          loadProjectBidData();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bidding Details</h2>
      <button
        onClick={onAddProjectBid}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        Add New Bid
      </button>

      {!loading ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Project Title</th>
              <th style={thStyle}>Portal</th>
              <th style={thStyle}>Project URL</th>
              <th style={thStyle}>Estimated Time</th>
              <th style={thStyle}>Estimated Cost</th>
              <th style={thStyle}>Remark</th>
              <th style={thStyle}>Edit</th>
              <th style={thStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {projectBidData.map((bid) => (
              <tr key={bid._id}>
                <td style={tdStyle}>{bid.ProjectTitle}</td>
                <td style={tdStyle}>{bid.PortalName}</td>
                <td style={tdStyle}>
                  <a href={bid.ProjectURL} target="_blank" rel="noopener noreferrer">
                    {bid.ProjectURL}
                  </a>
                </td>
                <td style={tdStyle}>{bid.EstimatedTime}</td>
                <td style={tdStyle}>{bid.EstimatedCost}</td>
                <td style={tdStyle}>{bid.Remark}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => onEditProjectBid(bid)}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => onProjectBidDelete(bid._id)}
                    style={deleteButtonStyle}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

// Inline styles for table elements
const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const editButtonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
};

const deleteButtonStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  padding: "5px 10px",
  border: "none",
  cursor: "pointer",
};

export default AdminProjectBidTable;
