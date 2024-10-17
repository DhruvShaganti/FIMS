import React, { useState, useEffect } from "react";
import axios from "axios";

const StateTable = ({ onAddState, onEditState }) => {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const loadStateData = () => {
    axios
      .get("http://localhost:4000/api/state", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        const rowData = response.data.map(data => ({
          ...data,
          CountryName: data["country"][0]["CountryName"],
          StateName: data["StateName"]
        }));
        setStateData(rowData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadStateData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/state/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadStateData(); // Refresh the data after deletion
        })
        .catch(error => {
          console.error(error);
          if (error.response?.status === 403) {
            alert(error.response.data);
          }
        });
    }
  };

  const handleEdit = (data) => {
    onEditState(data);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>State Details</h2>
      <button 
        style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }} 
        onClick={onAddState}
      >
        Add
      </button>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '45px' }}>
          <div className="loading-spinner" style={{ display: 'inline-block', border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Country</th>
              <th>State</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {stateData.map(row => (
              <tr key={row._id}>
                <td>{row.CountryName}</td>
                <td>{row.StateName}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(row)} 
                    style={{ padding: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(row._id)} 
                    style={{ padding: '5px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px' }}
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

export default StateTable;
