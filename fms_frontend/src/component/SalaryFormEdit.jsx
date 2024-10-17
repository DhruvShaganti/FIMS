import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Inline styles for the component
const styles = {
  container: {
    padding: '20px'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
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

const SalaryFormEdit = ({ editData, onSalaryEditUpdate, onFormEditClose }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [basicSalary, setBasicSalary] = useState(editData.salary[0].BasicSalary);
  const [bankName, setBankName] = useState(editData.salary[0].BankName);
  const [accountNo, setAccountNo] = useState(editData.salary[0].AccountNo);
  const [reAccountNo, setReAccountNo] = useState(editData.salary[0].AccountNo);
  const [accountHolderName, setAccountHolderName] = useState(editData.salary[0].AccountHolderName);
  const [ifscCode, setIfscCode] = useState(editData.salary[0].IFSCcode);
  const [taxDeduction, setTaxDeduction] = useState(editData.salary[0].TaxDeduction);

  useEffect(() => {
    const loadSalaryInfo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/salary", {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        });
        setSalaryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadSalaryInfo();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Salary Details</h2>
      <form onSubmit={e => onSalaryEditUpdate(editData, e)}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="salarySelect">
            Select Salary
          </label>
          <select
            id="salarySelect"
            name="salarySelect"
            style={styles.input}
            required
          >
            {salaryData.map((data, index) => (
              <option
                key={index}
                value={data["_id"]}
                selected={editData["_id"] === data["_id"]}
                disabled
              >
                {`${data["FirstName"]} ${data["MiddleName"]} ${data["LastName"]}`}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="basicSalary">
            Basic Salary
          </label>
          <input
            id="basicSalary"
            type="number"
            placeholder="Basic Salary"
            style={styles.input}
            required
            value={basicSalary}
            onChange={e => setBasicSalary(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="bankName">
            Bank Name
          </label>
          <input
            id="bankName"
            type="text"
            placeholder="Bank Name"
            style={styles.input}
            required
            value={bankName}
            onChange={e => setBankName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="accountNo">
            Account No
          </label>
          <input
            id="accountNo"
            type="text"
            placeholder="Account No"
            style={styles.input}
            required
            value={accountNo}
            onChange={e => setAccountNo(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="reAccountNo">
            Re-Enter Account No
          </label>
          <input
            id="reAccountNo"
            type="text"
            placeholder="Re-Enter Account No"
            style={styles.input}
            required
            value={reAccountNo}
            onChange={e => setReAccountNo(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="accountHolderName">
            Account Holder Name
          </label>
          <input
            id="accountHolderName"
            type="text"
            placeholder="Account Holder Name"
            style={styles.input}
            required
            value={accountHolderName}
            onChange={e => setAccountHolderName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="ifscCode">
            IFSC Code
          </label>
          <input
            id="ifscCode"
            type="text"
            placeholder="IFSC Code"
            style={styles.input}
            required
            value={ifscCode}
            onChange={e => setIfscCode(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="taxDeduction">
            Tax Deduction
          </label>
          <input
            id="taxDeduction"
            type="number"
            placeholder="Tax Deduction"
            style={styles.input}
            required
            value={taxDeduction}
            onChange={e => setTaxDeduction(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <button type="submit" style={styles.button}>Submit</button>
          <button type="button" onClick={onFormEditClose} style={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SalaryFormEdit;
