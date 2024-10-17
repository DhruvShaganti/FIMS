import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";

const FamilyInfoTable = ({ data, onAddFamilyInfo, onEditFamilyInfo, back }) => {
  const [familyInfoData, setFamilyInfoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamilyInfoData();
  }, []);

  const loadFamilyInfoData = () => {
    axios
      .get(`http://localhost:4000/api/family-info/${data["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const formattedData = response.data.familyInfo.map((info) => ({
          ...info,
          DOB: info["DOB"].slice(0, 10),
        }));
        setFamilyInfoData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFamilyInfoDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/family-info/${data["_id"]}/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => {
          loadFamilyInfoData();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderEditButton = (item) => (
    <FontAwesomeIcon
      icon={faEdit}
      onClick={() => onEditFamilyInfo(item)}
      style={{ cursor: 'pointer', marginRight: '8px' }}
    />
  );

  const renderDeleteButton = (id) => (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onFamilyInfoDelete(id)}
      style={{ cursor: 'pointer' }}
    />
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Employee Family Details {back ? `of ${data["FirstName"]} ${data["LastName"]}` : ""}
      </h2>
      {back ? (
        <Link to="/hr/employee">
          <button
            style={{ padding: "8px 16px", marginBottom: "16px" }}
          >
            Back
          </button>
        </Link>
      ) : (
        <button
          onClick={onAddFamilyInfo}
          style={{ padding: "8px 16px", marginBottom: "16px" }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Add
        </button>
      )}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <RingLoader size={50} color={"#0000ff"} />
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>DOB</th>
              <th>Occupation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {familyInfoData.map((item) => (
              <tr key={item["_id"]}>
                <td>{item["Name"]}</td>
                <td>{item["Relationship"]}</td>
                <td>{item["DOB"]}</td>
                <td>{item["Occupation"]}</td>
                <td>
                  {renderEditButton(item)}
                  {renderDeleteButton(item["_id"])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FamilyInfoTable;
