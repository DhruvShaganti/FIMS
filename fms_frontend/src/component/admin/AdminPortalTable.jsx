import React, { useState, useEffect } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";

const AdminPortalTable = ({ onAddPortal, onEditPortal }) => {
  const [portalData, setPortalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPortalData();
  }, []);

  const loadPortalData = () => {
    axios
      .get("http://localhost:4000/api/admin/portal", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        const data = response.data;
        const formattedData = data.map(item => ({
          ...item,
          Status: item.Status === 1 ? "enable" : "disable"
        }));
        setPortalData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const onPortalDelete = (id) => {
    if (window.confirm("Are you sure to delete this record? It will delete all projects related to this portal.")) {
      axios
        .delete(`http://localhost:4000/api/admin/portal/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => loadPortalData())
        .catch(error => console.error(error));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Portal Details</h2>
      <button
        onClick={onAddPortal}
        style={{ padding: '10px 20px', marginBottom: '20px', cursor: 'pointer' }}
      >
        Add
      </button>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <RingLoader
            size={50}
            color={"#0000ff"}
            loading={loading}
          />
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Portal</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Edit</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {portalData.map(item => (
              <tr key={item._id}>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.PortalName}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.Status}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => onEditPortal(item)} 
                    style={{ cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                </td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => onPortalDelete(item._id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPortalTable;
