import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorkExperienceTable = ({ data, onAddWorkExperience, onEditWorkExperience, back }) => {
  const [workExperienceData, setWorkExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWorkExperienceData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/work-experience/${data["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      });
      const workExperience = response.data.workExperience.map(item => ({
        ...item,
        FromDate: item["FromDate"].slice(0, 10),
        ToDate: item["ToDate"].slice(0, 10)
      }));
      setWorkExperienceData(workExperience);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onWorkExperienceDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      try {
        await axios.delete(`http://localhost:4000/api/work-experience/${data["_id"]}/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        loadWorkExperienceData(); // Refresh the data after deletion
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    loadWorkExperienceData();
  }, [data]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>
        Employee Work Experience Details {back ? `of ${data["FirstName"]} ${data["LastName"]}` : ''}
      </h2>

      {back ? (
        <Link to="/hr/employee">
          <button style={{ margin: '10px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
            Back
          </button>
        </Link>
      ) : (
        <button
          style={{ margin: '10px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
          onClick={onAddWorkExperience}
        >
          Add
        </button>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ border: '4px solid #f3f3f3', borderRadius: '50%', borderTop: '4px solid #3498db', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Designation</th>
              <th>From Date</th>
              <th>To Date</th>
              {!back && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {workExperienceData.map(item => (
              <tr key={item["_id"]}>
                <td>{item.CompanyName}</td>
                <td>{item.Designation}</td>
                <td>{item.FromDate}</td>
                <td>{item.ToDate}</td>
                {!back && (
                  <td>
                    <button
                      onClick={() => onEditWorkExperience(item)}
                      style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onWorkExperienceDelete(item["_id"])}
                      style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px' }}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkExperienceTable;
