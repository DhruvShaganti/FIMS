import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import Role from '../Role';
import NavBar from '../NavBar';
import Position from '../Position';
import Department from '../Department';
import Country from '../Country';
import State from '../State';
import City from '../City';
import Company from '../Company';
import Employee from '../Employee';
import Salary from '../Salary';
import LeaveApplicationHR from './LeaveApplicationHR';
import NotFound404 from ".././NotFound404"

const DashboardHR = ({ data, onLogout }) => {
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate()

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
  //   <div className="flex">
  //   {/* Sidebar */}
  //   <div
  //     className={`bg-gray-100 transition-all duration-300 overflow-hidden ${
  //       checked ? 'w-52' : 'w-0'
  //     }`}
  //   >
  //     <div className="font-bold mb-5 p-4">
  //       <span className="text-2xl">HR</span>
  //     </div>
  //     <ul className="list-none p-0">
  //       <li className="mb-4">
  //         <Link to="employee" className="flex items-center text-black no-underline">
  //           <span className="mr-2">👤</span>User
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="salary" className="flex items-center text-black no-underline">
  //           <span className="mr-2">💵</span>Salary
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="leave-application-hr" className="flex items-center text-black no-underline">
  //           <span className="mr-2">📄</span>Leave Application
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="company" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🌆</span>Company
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="role" className="flex items-center text-black no-underline">
  //           <span className="mr-2">👥</span>Role
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="position" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🪑</span>Position
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="department" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🏢</span>Department
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="country" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🌍</span>Country
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="state" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🏛️</span>State
  //         </Link>
  //       </li>
  //       <li className="mb-4">
  //         <Link to="city" className="flex items-center text-black no-underline">
  //           <span className="mr-2">🏙️</span>City
  //         </Link>
  //       </li>
  //     </ul>
  //   </div>
  
  //   {/* Main Content */}
  //   <div className="flex-1 p-4">
  //     <NavBar loginInfo={data} checked={checked} handleChange={handleChange} onLogout={onLogout} />
  //     <div className="mb-5">
  //       {/* <button
  //         onClick={handleChange}
  //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //       >
  //         Toggle Sidebar
  //       </button> */}
  //     </div>
  //     <Routes>
  //       <Route path="employee" element={<Employee />} />
  //       <Route path="salary" element={<Salary />} />
  //       <Route path="company" element={<Company />} />
  //       <Route path="role" element={<Role />} />
  //       <Route path="position" element={<Position />} />
  //       <Route path="department" element={<Department />} />
  //       <Route path="country" element={<Country />} />
  //       <Route path="state" element={<State />} />
  //       <Route path="city" element={<City />} />
  //       <Route path="leave-application-hr" element={<LeaveApplicationHR />} />
  //       <Route path="*" element={<NotFound404 />} />
  //     </Routes>
  //   </div>
  // </div>
  //   
  <div className="flex h-screen overflow-hidden">
  {/* Sidebar */}
  <div
    className={`bg-gray-100 transition-all duration-300 ${
      checked ? 'w-52' : 'w-0'
    } h-screen overflow-hidden flex-shrink-0`}
  >
    <div className="font-bold mb-5 p-4">
      <span className="text-2xl">HR</span>
    </div>
    <ul className="list-none p-0">
      <li className="mb-4">
        <Link to="employee" className="flex items-center text-black no-underline">
          <span className="mr-2">👤</span>User
        </Link>
      </li>
      <li className="mb-4">
        <Link to="salary" className="flex items-center text-black no-underline">
          <span className="mr-2">💵</span>Salary
        </Link>
      </li>
      <li className="mb-4">
        <Link to="leave-application-hr" className="flex items-center text-black no-underline">
          <span className="mr-2">📄</span>Leave Application
        </Link>
      </li>
      <li className="mb-4">
        <Link to="company" className="flex items-center text-black no-underline">
          <span className="mr-2">🌆</span>Company
        </Link>
      </li>
      <li className="mb-4">
        <Link to="role" className="flex items-center text-black no-underline">
          <span className="mr-2">👥</span>Role
        </Link>
      </li>
      <li className="mb-4">
        <Link to="position" className="flex items-center text-black no-underline">
          <span className="mr-2">🪑</span>Position
        </Link>
      </li>
      <li className="mb-4">
        <Link to="department" className="flex items-center text-black no-underline">
          <span className="mr-2">🏢</span>Department
        </Link>
      </li>
      <li className="mb-4">
        <Link to="country" className="flex items-center text-black no-underline">
          <span className="mr-2">🌍</span>Country
        </Link>
      </li>
      <li className="mb-4">
        <Link to="state" className="flex items-center text-black no-underline">
          <span className="mr-2">🏛️</span>State
        </Link>
      </li>
      <li className="mb-4">
        <Link to="city" className="flex items-center text-black no-underline">
          <span className="mr-2">🏙️</span>City
        </Link>
      </li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col overflow-auto">
    <NavBar
      loginInfo={data}
      checked={checked}
      handleChange={handleChange}
      onLogout={onLogout}
      className="flex-shrink-0"
    />
    <div className="flex-1 p-4 overflow-y-auto">
      <Routes>
        <Route path="employee" element={<Employee />} />
        <Route path="salary" element={<Salary />} />
        <Route path="company" element={<Company />} />
        <Route path="role" element={<Role />} />
        <Route path="position" element={<Position />} />
        <Route path="department" element={<Department />} />
        <Route path="country" element={<Country />} />
        <Route path="state" element={<State />} />
        <Route path="city" element={<City />} />
        <Route path="leave-application-hr" element={<LeaveApplicationHR />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  </div>
</div>



  );
};

export default DashboardHR;
