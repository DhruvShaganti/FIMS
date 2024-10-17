import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveApplicationEmpForm = ({ editData, onLeaveApplicationEmpEditUpdate, onFormEditClose }) => {
  const [fromDateData, setFromDateData] = useState(editData["FromDate"].slice(0, 10));
  const [toDateData, setToDateData] = useState(editData["ToDate"].slice(0, 10));
  const [reasonForLeaveData, setReasonForLeaveData] = useState(editData["Reasonforleave"]);
  const [leaveTypeData, setLeaveTypeData] = useState(editData["Leavetype"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLeaveApplicationEmpEditUpdate(editData, event);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Leave Application Details</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Leave Type</label>
          <select
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value={leaveTypeData}
            onChange={(e) => setLeaveTypeData(e.target.value)}
            required
          >
            <option value="" disabled>Select your option</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Privilege Leave">Privilege Leave</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>From Date</label>
          <input
            type="date"
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value={fromDateData}
            onChange={(e) => setFromDateData(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>To Date</label>
          <input
            type="date"
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value={toDateData}
            onChange={(e) => setToDateData(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Reason for Leave</label>
          <input
            type="text"
            placeholder="Reason for leave"
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value={reasonForLeaveData}
            onChange={(e) => setReasonForLeaveData(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Leave Status</label>
          <select
            style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
            value="1"
            disabled
            required
          >
            <option value="1">Pending</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={onFormEditClose}
            style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplicationEmpForm;
