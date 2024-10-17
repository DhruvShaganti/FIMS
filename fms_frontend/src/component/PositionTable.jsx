import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

const PositionTable = ({ onAddPosition, onEditPosition }) => {
  const [positionData, setPositionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const loadPositionData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/position', {
        headers: {
          authorization: localStorage.getItem('token') || '',
        },
      });
      const data = response.data;
      setPositionData(data);
      setLoading(false);

      const transformedData = data.map(item => ({
        ...item,
        CompanyName: item.company[0].CompanyName,
        PositionName: item.PositionName,
      }));
      setRowData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPositionData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      try {
        await axios.delete(`http://localhost:4000/api/position/${id}`, {
          headers: {
            authorization: localStorage.getItem('token') || '',
          },
        });
        loadPositionData(); // Reload data after deletion
      } catch (error) {
        console.error(error);
        if (error.response?.status === 403) {
          window.alert(error.response.data);
        }
      }
    }
  };

  const renderButton = (id) => (
    <button
      onClick={() => handleDelete(id)}
      style={{ cursor: 'pointer', border: 'none', background: 'none' }}
    >
      ❌
    </button>
  );

  const renderEditButton = (data) => (
    <button
      onClick={() => onEditPosition(data)}
      style={{ cursor: 'pointer', border: 'none', background: 'none' }}
    >
      ✏️
    </button>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Position Details</h2>
      <button
        onClick={onAddPosition}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ➕ Add
      </button>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <RingLoader size={50} color={"#0000ff"} loading={true} />
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Company</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Position</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px', width: '50px' }} />
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px', width: '50px' }} />
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index}>
                <td style={{ padding: '8px' }}>{data.CompanyName}</td>
                <td style={{ padding: '8px' }}>{data.PositionName}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {renderEditButton(data)}
                </td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  {renderButton(data._id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PositionTable;
