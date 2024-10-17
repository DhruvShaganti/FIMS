import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

// Inline styles for the component
const styles = {
  container: {
    padding: '20px'
  },
  title: {
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    border: '1px solid #ddd'
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd'
  },
  loadingContainer: {
    textAlign: 'center',
    marginTop: '50px'
  },
  editButton: {
    cursor: 'pointer',
    color: '#007bff'
  },
  deleteButton: {
    cursor: 'pointer',
    color: '#dc3545'
  }
};

const RoleTable = ({ onAddRole, onEditRole }) => {
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load role data from API
  const loadRoleData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/role', {
        headers: {
          authorization: localStorage.getItem('token') || ''
        }
      });
      setRoleData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRoleData();
  }, []);

  const onRoleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:4000/api/role/${id}`, {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        });
        loadRoleData(); // Reload data after deletion
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          alert(error.response.data);
        }
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Role Details</h2>
      <button style={styles.button} onClick={onAddRole}>
        Add
      </button>
      {loading ? (
        <div style={styles.loadingContainer}>
          <RingLoader size={50} color={'#0000ff'} loading={true} />
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Company Name</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Edit</th>
                <th style={styles.th}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {roleData.map((data) => (
                <tr key={data._id}>
                  <td style={styles.td}>{data.company[0].CompanyName}</td>
                  <td style={styles.td}>{data.RoleName}</td>
                  <td style={styles.td}>
                    <span
                      style={styles.editButton}
                      onClick={() => onEditRole(data)}
                    >
                      Edit
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span
                      style={styles.deleteButton}
                      onClick={() => onRoleDelete(data._id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoleTable;
