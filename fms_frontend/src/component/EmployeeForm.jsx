import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeForm({ onEmployeeSubmit, onFormClose, onGenderChange }) {
  const [roleData, setRoleData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    loadRoleInfo();
    loadPositionInfo();
    loadDepartmentInfo();
  }, []);

  const loadRoleInfo = () => {
    axios
      .get("http://localhost:4000/api/role", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadPositionInfo = () => {
    axios
      .get("http://localhost:4000/api/position", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setPositionData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadDepartmentInfo = () => {
    axios
      .get("http://localhost:4000/api/department", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmployeeSubmit(e);
  };

  return (
    <div>
      <h2>Add Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Email" required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" required />
        </div>

        <div>
          <label>Account Access:</label>
          <select required>
            <option value="1">Admin</option>
            <option value="2">HR</option>
            <option value="3">Employee</option>
          </select>
        </div>

        <div>
          <label>Role:</label>
          <select name="role" required>
            <option disabled selected>
              Select your option
            </option>
            {roleData.map((role, index) => (
              <option key={index} value={role["_id"]}>
                {role["RoleName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            value="male"
            name="gender"
            onChange={onGenderChange}
            required
          />
          Male
          <input
            type="radio"
            value="female"
            name="gender"
            onChange={onGenderChange}
            required
          />
          Female
        </div>

        <div>
          <label>First Name:</label>
          <input type="text" placeholder="First Name" required />
        </div>

        <div>
          <label>Middle Name:</label>
          <input type="text" placeholder="Middle Name" required />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" placeholder="Last Name" required />
        </div>

        <div>
          <label>DOB:</label>
          <input type="date" placeholder="DOB" required />
        </div>

        <div>
          <label>Contact No:</label>
          <input type="text" placeholder="Contact No" required />
        </div>

        <div>
          <label>Employee Code:</label>
          <input type="text" placeholder="Employee Code" required />
        </div>

        <div>
          <label>Department:</label>
          <select name="department" required>
            <option value="" disabled selected>
              Select your option
            </option>
            {departmentData.map((department, index) => (
              <option key={index} value={department["_id"]}>
                {department["DepartmentName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Position:</label>
          <select name="position" required>
            <option value="" disabled selected>
              Select your option
            </option>
            {positionData.map((position, index) => (
              <option key={index} value={position["_id"]}>
                {position["PositionName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date Of Joining:</label>
          <input type="date" placeholder="Date Of Joining" required />
        </div>

        <div>
          <label>Terminate Date:</label>
          <input type="date" placeholder="Terminate Date" />
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onFormClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
