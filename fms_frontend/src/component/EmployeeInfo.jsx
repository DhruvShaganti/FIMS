import React from 'react'
import { Link } from "react-router-dom";

const EmployeeInfo = ({ onBack, data }) => {
  return (
    <div>
      <div onClick={onBack}>
        <button>Back</button>
      </div>

      <h2>Employee Information of {data.FirstName + " " + data.LastName}</h2>

      <div>
        <Link to="/hr/employee/info/personal-info">
          <button>Personal Information</button>
        </Link>

        <Link to="/hr/employee/info/education">
          <button>Education</button>
        </Link>

        <Link to="/hr/employee/info/family-info">
          <button>Dependents</button>
        </Link>

        <Link to="/hr/employee/info/work-experience">
          <button>Work Experience</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeInfo;
