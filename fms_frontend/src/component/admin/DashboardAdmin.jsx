import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from "react-router-dom";

import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import RoleForm from "../RoleForm.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import NotFound404 from ".././NotFound404"

const DashboardAdmin = ({ data, onLogout }) => {
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate()

  const handleChange = () => {
    const sidebar = document.getElementById("sidebar");
    if (checked) {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "block";
    } 
    setChecked(!checked);
  };

  return (
    <div className="dashboard-container">
      <div>
        <NavBar loginInfo={data} checked={checked} handleChange={handleChange} onLogout={onLogout} />
      </div>

      <div className="dashboard-content">
        <div id="sidebar" className="dashboard-sidebar">
          <div className="sidebar-top-content" />
          <div className="main-title">Admin</div>
          <ul className="navbar-ul">
            <li className="navbar-li">
              <Link to="/admin/role" className="navbar-link">
                Role
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/admin/position" className="navbar-link">
                Position
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/admin/department" className="navbar-link">
                Department
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/admin/project-bid" className="navbar-link">
                Project Bidding
              </Link>
            </li>
            <li className="navbar-li">
              <Link to="/admin/portal-master" className="navbar-link">
                Portal Master
              </Link>
            </li>
          </ul>
        </div>

        <div className="main-area">
          <div className="sidebar-top-content" />
          <Routes>
            <Route exact path="/role" element={<Role />} />
            <Route exact path="/form" element={<RoleForm />} />
            <Route exact path="/position" element={<Position />} />
            <Route exact path="/department" element={<Department />} />
            <Route exact path="/portal-master" element={<AdminPortal />} />
            <Route exact path="/project-bid" element={<AdminProjectBid />} />
            {/* <Route path="*" element={<NotFound404 />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const outerMainDivStyle = {
  display: "flex",
  // justifyContent: "center",
  // aliginItems: "center",
  height: "100vh",
};

const outerNavStyle = {
  width: "100%",
};

const mainNonNavStyle = {
  display: "flex",
  flexDirection: "row",
  flex: 1,
};

const sidebarStyle = {
  width: "200px",
  backgroundColor: "#f4f4f4",
  padding: "10px",
};

const sidebarTopContentStyle = {
  height: "50px",
};

const mainTitleStyle = {
  fontWeight: "bold",
  marginBottom: "20px",
};

const navbarUlStyle = {
  listStyleType: "none",
  padding: "0",
};

const navbarLiStyle = {
  marginBottom: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
};

const mainAreaStyle = {
  flex: 1,
  padding: "20px",
};

export default DashboardAdmin;
