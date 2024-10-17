import React, { useState } from 'react';

const LeaveApplicationHRForm = ({ editData, onLeaveApplicationHREditUpdate, onFormEditClose }) => {
  const [fromDateData] = useState(editData["FromDate"].slice(0, 10));
  const [toDateData] = useState(editData["ToDate"].slice(0, 10));
  const [reasonForLeaveData] = useState(editData["Reasonforleave"]);
  const nameData = `${editData["employee"][0]["FirstName"]} ${editData["employee"][0]["LastName"]}`;

  return (
    <div>
      <h2>Edit Leave Application Of {nameData}</h2>

      <div>
        <form
          onSubmit={e => onLeaveApplicationHREditUpdate(editData, e)}
        >
          <div>
            <label>
              Leave Type
              <select required defaultValue={editData["Leavetype"]}>
                <option value="" disabled>Select your option</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Privilege Leave">Privilege Leave</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              From Date
              <input
                type="date"
                required
                disabled
                value={fromDateData}
              />
            </label>
          </div>

          <div>
            <label>
              To Date
              <input
                type="date"
                required
                disabled
                value={toDateData}
              />
            </label>
          </div>

          <div>
            <label>
              Reason for Leave
              <input
                type="text"
                placeholder="Reason for leave"
                required
                disabled
                value={reasonForLeaveData}
              />
            </label>
          </div>

          <div>
            <label>
              Leave Status
              <select required defaultValue={editData["Status"]}>
                <option value="Pending" disabled>Pending</option>
                <option value="2">Approve</option>
                <option value="3">Reject</option>
              </select>
            </label>
          </div>

          <div>
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={onFormEditClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationHRForm;
