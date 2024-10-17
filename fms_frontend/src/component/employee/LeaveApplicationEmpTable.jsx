import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveApplicationEmpTable = ({ data, onAddLeaveApplicationEmp, onEditLeaveApplicationEmp }) => {
  const [leaveApplicationEmpData, setLeaveApplicationEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    loadLeaveApplicationEmpData();
  }, []);

  const loadLeaveApplicationEmpData = () => {
    axios
      .get(`http://localhost:4000/api/leave-application-emp/${data["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then(response => {
        const leaveApplicationEmpObj = response.data;
        const updatedRowData = leaveApplicationEmpObj.leaveApplication.map(item => ({
          ...item,
          FromDate: item["FromDate"].slice(0, 10),
          ToDate: item["ToDate"].slice(0, 10),
          Status: status(item["Status"]),
        }));
        setLeaveApplicationEmpData(leaveApplicationEmpObj);
        setRowData(updatedRowData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const status = s => {
    if (s === 1) return "Pending";
    if (s === 2) return "Approved";
    if (s === 3) return "Rejected";
    return "";
  };

  const onLeaveApplicationEmpDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`http://localhost:4000/api/leave-application-emp/${data["_id"]}/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then(() => loadLeaveApplicationEmpData())
        .catch(error => console.error(error));
    }
  };

  const onEdit = (item) => {
    if (item["Status"] === 1) {
      onEditLeaveApplicationEmp(item);
    } else {
      alert("You cannot edit an application after it has been approved or rejected.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leave Application</h2>

      <button
        onClick={onAddLeaveApplicationEmp}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px"
        }}
      >
        Add
      </button>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <div style={{ border: "8px solid #f3f3f3", borderRadius: "50%", borderTop: "8px solid #3498db", width: "50px", height: "50px", animation: "spin 2s linear infinite" }}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason for Leave</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((item) => (
                <tr key={item["_id"]}>
                  <td>{item["Leavetype"]}</td>
                  <td>{item["FromDate"]}</td>
                  <td>{item["ToDate"]}</td>
                  <td>{item["Reasonforleave"]}</td>
                  <td>{item["Status"]}</td>
                  <td>
                    <button
                      onClick={() => onEdit(item)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#ffc107",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => onLeaveApplicationEmpDelete(item["_id"])}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
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

export default LeaveApplicationEmpTable;
