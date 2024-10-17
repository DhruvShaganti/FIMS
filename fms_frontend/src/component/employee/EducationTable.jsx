import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

const EducationTable = ({ data, onAddEducation, onEditEducation, back }) => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducationData();
  }, []);

  const loadEducationData = () => {
    axios
      .get(`http://localhost:4000/api/education/${data["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setEducationData(response.data.education);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onEducationDelete = (educationId) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/education/${data["_id"]}/${educationId}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadEducationData(); // Reload data after deletion
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const renderEditButton = (education) => {
    if (back) return null;
    return (
      <button onClick={() => onEditEducation(education)} style={{ marginRight: "5px" }}>
        Edit
      </button>
    );
  };

  const renderDeleteButton = (educationId) => {
    if (back) return null;
    return (
      <button onClick={() => onEducationDelete(educationId)}>
        Delete
      </button>
    );
  };

  return (
    <div>
      <h2>
        Employee Education Details {back ? `of ${data["FirstName"]} ${data["LastName"]}` : ""}
      </h2>

      {back ? (
        <Link to="/hr/employee">
          <button>Back</button>
        </Link>
      ) : (
        <button onClick={onAddEducation}>
          Add
        </button>
      )}

      <div style={{ marginTop: "10px" }} />

      {!loading ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>School/University</th>
              <th>Degree</th>
              <th>Grade</th>
              <th>Passing Of Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {educationData.map((education) => (
              <tr key={education._id}>
                <td>{education.SchoolUniversity}</td>
                <td>{education.Degree}</td>
                <td>{education.Grade}</td>
                <td>{education.PassingOfYear}</td>
                <td>
                  {renderEditButton(education)}
                  {renderDeleteButton(education._id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center" }}>
          <RingLoader sizeUnit={"px"} size={50} color={"#0000ff"} loading={true} />
        </div>
      )}
    </div>
  );
};

export default EducationTable;
