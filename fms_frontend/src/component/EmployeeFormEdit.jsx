import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeFormEdit = ({ editData, onEmployeeEditUpdate, onFormEditClose, onGenderChange }) => {
  const [roleData, setRoleData] = useState([]);
  const [positionData, setPositionData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [GenderData, setGenderData] = useState(editData["Gender"]);
  const [EmailData, setEmailData] = useState(editData["Email"]);
  const [FirstNameData, setFirstNameData] = useState(editData["FirstName"]);
  const [MiddleNameData, setMiddleNameData] = useState(editData["MiddleName"]);
  const [LastNameData, setLastNameData] = useState(editData["LastName"]);
  const [DOBData, setDOBData] = useState(editData["DOB"].slice(0, 10));
  const [ContactNoData, setContactNoData] = useState(editData["ContactNo"]);
  const [EmployeeCodeData, setEmployeeCodeData] = useState(editData["EmployeeCode"]);
  const [DateOfJoiningData, setDateOfJoiningData] = useState(editData["DateOfJoining"].slice(0, 10));
  const [TerminateDateData, setTerminateDateData] = useState(editData["TerminateDate"].slice(0, 10));

  useEffect(() => {
    const loadRoleInfo = () => {
      axios.get("http://localhost:4000/api/role", {
        headers: { authorization: localStorage.getItem("token") || "" }
      })
      .then(response => setRoleData(response.data))
      .catch(error => console.log(error));
    };
    
    const loadPositionInfo = () => {
      axios.get("http://localhost:4000/api/position", {
        headers: { authorization: localStorage.getItem("token") || "" }
      })
      .then(response => setPositionData(response.data))
      .catch(error => console.log(error));
    };

    const loadDepartmentInfo = () => {
      axios.get("http://localhost:4000/api/department", {
        headers: { authorization: localStorage.getItem("token") || "" }
      })
      .then(response => setDepartmentData(response.data))
      .catch(error => console.log(error));
    };

    loadRoleInfo();
    loadPositionInfo();
    loadDepartmentInfo();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEmployeeEditUpdate(editData, e);
  };

  return (
    <div>
      <h2>Edit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={EmailData} 
            onChange={e => setEmailData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Account Access</label>
          <select required>
            <option value="1" selected={editData["Account"] === 1}>Admin</option>
            <option value="2" selected={editData["Account"] === 2}>HR</option>
            <option value="3" selected={editData["Account"] === 3}>Employee</option>
          </select>
        </div>

        <div>
          <label>Role</label>
          <select name="role">
            <option disabled selected>Select your option</option>
            {roleData.map((data, index) => (
              <option key={index} value={data["_id"]} selected={editData["role"][0]["_id"] === data["_id"]}>
                {data["RoleName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Gender</label>
          <input 
            type="radio" 
            name="gender" 
            value="male" 
            checked={GenderData === "male"} 
            onChange={(e) => { setGenderData(e.target.value); onGenderChange(e); }} 
            required 
          /> Male
          <input 
            type="radio" 
            name="gender" 
            value="female" 
            checked={GenderData === "female"} 
            onChange={(e) => { setGenderData(e.target.value); onGenderChange(e); }} 
            required 
          /> Female
        </div>

        <div>
          <label>First Name</label>
          <input 
            type="text" 
            value={FirstNameData} 
            onChange={e => setFirstNameData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Middle Name</label>
          <input 
            type="text" 
            value={MiddleNameData} 
            onChange={e => setMiddleNameData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            value={LastNameData} 
            onChange={e => setLastNameData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>DOB</label>
          <input 
            type="date" 
            value={DOBData} 
            onChange={e => setDOBData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Contact No</label>
          <input 
            type="text" 
            value={ContactNoData} 
            onChange={e => setContactNoData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Employee Code</label>
          <input 
            type="text" 
            value={EmployeeCodeData} 
            onChange={e => setEmployeeCodeData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Department</label>
          <select name="department" required>
            <option disabled selected>Select your option</option>
            {departmentData.map((data, index) => (
              <option key={index} value={data["_id"]} selected={editData["department"][0]["_id"] === data["_id"]}>
                {data["DepartmentName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Position</label>
          <select name="position" required>
            <option disabled selected>Select your option</option>
            {positionData.map((data, index) => (
              <option key={index} value={data["_id"]} selected={editData["position"][0]["_id"] === data["_id"]}>
                {data["PositionName"]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date Of Joining</label>
          <input 
            type="date" 
            value={DateOfJoiningData} 
            onChange={e => setDateOfJoiningData(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Terminate Date</label>
          <input 
            type="date" 
            value={TerminateDateData} 
            onChange={e => setTerminateDateData(e.target.value)} 
          />
        </div>

        <div>
          <button type="submit">Submit</button>
          <button type="reset" onClick={onFormEditClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeFormEdit;
