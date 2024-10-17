import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import NotFound404 from ".././NotFound404";

const DashboardHR = ({ data, onLogout }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <div className="fixed w-full z-10">
        <NavBar loginInfo={data} checked={isSidebarVisible} handleChange={toggleSidebar} onLogout={onLogout} />
      </div>

      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="w-64 fixed top-16 bottom-0 bg-gray-100 p-4">
          <div className="mb-5 font-bold text-2xl">
            Employee
          </div>
          <ul className="space-y-4">
            <li>
              <Link to={`/employee/${data["_id"]}/personal-info`} className="text-blue-600 hover:underline">
                Personal Information
              </Link>
            </li>
            <li>
              <Link to={`/employee/${data["_id"]}/education`} className="text-blue-600 hover:underline">
                Education
              </Link>
            </li>
            <li>
              <Link to={`/employee/${data["_id"]}/family-info`} className="text-blue-600 hover:underline">
                Dependents
              </Link>
            </li>
            <li>
              <Link to={`/employee/${data["_id"]}/work-experience`} className="text-blue-600 hover:underline">
                Work Experience
              </Link>
            </li>
            <li>
              <Link to={`/employee/${data["_id"]}/leave-application-emp`} className="text-blue-600 hover:underline">
                Leave Application
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className={`mt-16 p-4 flex-1 overflow-y-auto transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
        <Routes>
          <Route
            exact
            path="/:id/personal-info"
            element={<PersonalInfo data={data} back={false} />}
          />
          <Route
            exact
            path="/:id/education"
            element={<Education data={data} back={false} />}
          />
          <Route
            exact
            path="/:id/family-info"
            element={<FamilyInfo data={data} back={false} />}
          />
          <Route
            exact
            path="/:id/work-experience"
            element={<WorkExperience data={data} back={false} />}
          />
          <Route
            exact
            path="/:id/leave-application-emp"
            element={<LeaveApplicationEmp data={data} />}
          />
          {/* <Route path="*" element={<NotFound404 />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default DashboardHR;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import NavBar from "../NavBar.jsx";
// import PersonalInfo from "./PersonalInfo.jsx";
// import Education from "./Education.jsx";
// import FamilyInfo from "./FamilyInfo.jsx";
// import WorkExperience from "./WorkExperience.jsx";
// import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
// import NotFound404 from ".././NotFound404"

// const DashboardHR = ({ data, onLogout }) => {
//   const [checked, setChecked] = useState(true);

//   const handleChange = () => {
//     const sidebar = document.getElementById("sidebar");
//     if (checked) {
//       sidebar.style.display = "none";
//     } else {
//       sidebar.style.display = "block";
//     }
//     setChecked(!checked);
//   };

//   return (
//       <div className="flex h-screen">
//       {/* Navbar */}
//       <div className="fixed w-full z-10">
//         <NavBar loginInfo={data} checked={checked} handleChange={handleChange} onLogout={onLogout} />
//       </div>

//       {/* Sidebar */}
//       <div className="w-64 fixed top-16 bottom-0 bg-gray-100 p-4">
//         <div className="mb-5 font-bold text-2xl">
//           Employee
//         </div>
//         <ul className="space-y-4">
//           <li>
//             <Link to={`/employee/${data["_id"]}/personal-info`} className="text-blue-600 hover:underline">
//               Personal Information
//             </Link>
//           </li>
//           <li>
//             <Link to={`/employee/${data["_id"]}/education`} className="text-blue-600 hover:underline">
//               Education
//             </Link>
//           </li>
//           <li>
//             <Link to={`/employee/${data["_id"]}/family-info`} className="text-blue-600 hover:underline">
//               Dependents
//             </Link>
//           </li>
//           <li>
//             <Link to={`/employee/${data["_id"]}/work-experience`} className="text-blue-600 hover:underline">
//               Work Experience
//             </Link>
//           </li>
//           <li>
//             <Link to={`/employee/${data["_id"]}/leave-application-emp`} className="text-blue-600 hover:underline">
//               Leave Application
//             </Link>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 mt-16 p-4 flex-1 overflow-y-auto">
//         <Routes>
//           <Route
//             exact
//             path="/:id/personal-info"
//             element={<PersonalInfo data={data} back={false} />}
//           />
//           <Route
//             exact
//             path="/:id/education"
//             element={<Education data={data} back={false} />}
//           />
//           <Route
//             exact
//             path="/:id/family-info"
//             element={<FamilyInfo data={data} back={false} />}
//           />
//           <Route
//             exact
//             path="/:id/work-experience"
//             element={<WorkExperience data={data} back={false} />}
//           />
//           <Route
//             exact
//             path="/:id/leave-application-emp"
//             element={<LeaveApplicationEmp data={data} />}
//           />
//           {/* <Route path="*" element={<NotFound404 />} /> */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// // Inline styles
// const outerMainDivStyle = {
//   display: "flex",
//   height: "100vh",
// };

// const outerNavStyle = {
//   width: "100%",
// };

// const mainNonNavStyle = {
//   display: "flex",
//   flexDirection: "row",
//   flex: 1,
// };

// const sidebarStyle = {
//   width: "200px",
//   backgroundColor: "#f4f4f4",
//   padding: "10px",
// };

// const sidebarTopContentStyle = {
//   height: "50px",
// };

// const mainTitleStyle = {
//   fontWeight: "bold",
//   marginBottom: "20px",
// };

// const navbarUlStyle = {
//   listStyleType: "none",
//   padding: "0",
// };

// const navbarLiStyle = {
//   marginBottom: "10px",
// };

// const linkStyle = {
//   textDecoration: "none",
//   color: "#333",
// };

// const mainAreaStyle = {
//   flex: 1,
//   padding: "20px",
// };

// export default DashboardHR;
