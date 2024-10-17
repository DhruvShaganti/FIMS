import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AdminSalaryTable = ({ onAddSalary, onEditSalary }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const loadSalaryData = async () => {
      console.log("No")
      try {
        const response = await axios.get("http://localhost:4000/api/salary", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        const data = response.data;
        const transformedData = data.map(item => ({
          EmployeeName: `${item.FirstName} ${item.MiddleName} ${item.LastName}`,
          BasicSalary: item.salary[0].BasicSalary,
          BankName: item.salary[0].BankName,
          AccountNo: item.salary[0].AccountNo,
          AccountHolderName: item.salary[0].AccountHolderName,
          IFSCcode: item.salary[0].IFSCcode,
          TaxDeduction: item.salary[0].TaxDeduction,
          id: item._id
        }));
        setRowData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadSalaryData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      try {
        await axios.delete(`http://localhost:4000/api/salary/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        setRowData(rowData.filter(item => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Salary Details</h2>
      <button onClick={onAddSalary}>
        Add
      </button>

      <div/>

      {!loading ? (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Basic Salary</th>
              <th>Bank Name</th>
              <th>Account No</th>
              <th>Account Holder Name</th>
              <th>IFSC Code</th>
              <th>Tax Deduction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data) => (
              <tr key={data.id}>
                <td>{data.EmployeeName}</td>
                <td>{data.BasicSalary}</td>
                <td>{data.BankName}</td>
                <td>{data.AccountNo}</td>
                <td>{data.AccountHolderName}</td>
                <td>{data.IFSCcode}</td>
                <td>{data.TaxDeduction}</td>
                <td>
                  <button
                   
                    onClick={() => onEditSalary(data)}
                  >
                    Edit
                  </button>
                  <button
                   
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default AdminSalaryTable;
