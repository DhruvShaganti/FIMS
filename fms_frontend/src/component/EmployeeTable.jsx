import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminEmployeeTable = ({ onAddEmployee, onEditEmployee, onEmpInfo }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const loadEmployeeData = () => {
    axios
      .get("http://localhost:4000/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        const data = response.data.map((employee) => ({
          ...employee,
          Account:
            employee.Account === 1
              ? "Admin"
              : employee.Account === 2
              ? "HR"
              : "Employee",
          RoleName: employee.role[0]?.RoleName,
          DepartmentName: employee.department[0]?.DepartmentName,
          PositionName: employee.position[0]?.PositionName,
          DOB: employee.DOB?.slice(0, 10),
          DateOfJoining: employee.DateOfJoining?.slice(0, 10),
        }));

        setEmployeeData(response.data);
        setRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const onEmployeeDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      window.alert("You are not allowed to perform this operation");
      // Uncomment this to actually delete data:
      // axios
      //   .delete(`http://localhost:4000/api/employee/${id}`, {
      //     headers: { authorization: localStorage.getItem("token") || "" },
      //   })
      //   .then(() => {
      //     loadEmployeeData();
      //   })
      //   .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <button onClick={onAddEmployee}>Add Employee</button>

      {!loading ? (
        <table>
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Email</th>
              <th>Account Access</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>ContactNo</th>
              <th>Role</th>
              <th>Position Name</th>
              <th>Department Name</th>
              <th>Date Of Joining</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.EmployeeCode}</td>
                <td>{employee.Email}</td>
                <td>{employee.Account}</td>
                <td>{employee.FirstName}</td>
                <td>{employee.MiddleName}</td>
                <td>{employee.LastName}</td>
                <td>{employee.DOB}</td>
                <td>{employee.ContactNo}</td>
                <td>{employee.RoleName}</td>
                <td>{employee.PositionName}</td>
                <td>{employee.DepartmentName}</td>
                <td>{employee.DateOfJoining}</td>
                <td>
                  <button onClick={() => onEmpInfo(employee)}>Info</button>
                  <button onClick={() => onEditEmployee(employee)}>Edit</button>
                  <button onClick={() => onEmployeeDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminEmployeeTable;
