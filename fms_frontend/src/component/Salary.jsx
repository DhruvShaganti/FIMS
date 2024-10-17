import React, { useState } from 'react';
import axios from 'axios';
import AdminSalaryTable from './SalaryTable';
import SalaryForm from './SalaryForm';
import SalaryFormEdit from './SalaryFormEdit';

// Inline styles for the component
const styles = {
  container: {
    padding: '20px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

const Salary = () => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSalarySubmit = (event) => {
    event.preventDefault();
    if (event.target[3].value !== event.target[4].value) {
      window.alert("The bank account number you entered does not match");
    } else {
      const body = {
        BasicSalary: event.target[1].value,
        BankName: event.target[2].value,
        AccountNo: event.target[3].value,
        AccountHolderName: event.target[5].value,
        IFSCcode: event.target[6].value,
        TaxDeduction: event.target[7].value,
      };
      axios
        .post(`http://localhost:4000/api/salary/${event.target[0].value}`, body, {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        })
        .then(() => {
          setTable(true);
        })
        .catch((err) => {
          console.error(err);
          if (err.response?.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  const handleAddSalary = () => {
    setTable(false);
  };

  const handleEditSalary = (data) => {
    setEditForm(true);
    setEditData(data);
  };

  const handleFormClose = () => {
    setTable(true);
  };

  const handleEditFormClose = () => {
    setEditForm(false);
  };

  const handleSalaryEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    if (newInfo.target[3].value !== newInfo.target[4].value) {
      window.alert("The bank account number you entered does not match");
    } else {
      const body = {
        BasicSalary: newInfo.target[1].value,
        BankName: newInfo.target[2].value,
        AccountNo: newInfo.target[3].value,
        AccountHolderName: newInfo.target[5].value,
        IFSCcode: newInfo.target[6].value,
        TaxDeduction: newInfo.target[7].value,
      };
      axios
        .put(`http://localhost:4000/api/salary/${info.salary[0]._id}`, body, {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        })
        .then(() => {
          setTable(true);
        })
        .catch((err) => {
          console.error(err);
        });
      setEditForm(false);
    }
  };

  return (
    <div>
      {/* {table ? (
        editForm ? (
          <SalaryFormEdit
            onSalaryEditUpdate={handleSalaryEditUpdate}
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : ( */}
          <AdminSalaryTable onAddSalary={handleAddSalary} onEditSalary={handleEditSalary} />
        {/* )
      ) : (
        <SalaryForm
          onSalarySubmit={handleSalarySubmit}
          onFormClose={handleFormClose}
        />
      )} */}
    </div>
  );
};

export default Salary;
