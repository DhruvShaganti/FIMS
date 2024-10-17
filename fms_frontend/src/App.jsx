import React from 'react';
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import jwt from "jsonwebtoken";

import Login from "./component/Login.jsx";
import NotFound404 from "./component/NotFound404.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState({
    _id: sessionStorage.getItem("_id") || undefined,
    Account: sessionStorage.getItem("Account") || undefined,
    Name: sessionStorage.getItem("Name") || undefined
  });
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(true);
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin") === "true");
  const [firstTimeAlert, setFirstTimeAlert] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (firstTimeAlert && !isLogin) {
      setTimeout(() => {
        window.alert(
          `To explore the features of this application, here are the temporary IDs and passwords for all accounts:
      Admin:
          id: admin@gmail.com
          pass: admin
      HR:
          id: hr@gmail.com
          pass: hr
      Employee:
          id: emp@gmail.com
          pass: emp`
        );
      }, 500);
      setFirstTimeAlert(false);
    }
    else{
      if(sessionStorage.getItem("isLogin") === "true"){
        setIsLogin(true)
        setFirstTimeAlert(false);
        // setData({
        //   _id: localStorage.getItem("_id"),
        //   Account: localStorage.getItem("Account"),
        //   Name: `${localStorage.getItem("FirstName")} ${localStorage.getItem("LastName")}`
        // })
        if (data.Account === 1) {
          navigate("/admin/role");
        } else if (data.Account === 2) {
          navigate("/hr/employee");
        } else if (data.Account === 3) {
          navigate(`/employee/${data._id}/personal-info`);
        }
      }
    }
  }, [firstTimeAlert, isLogin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPass(true);
    setLoading(true);
    await login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    setData({});
    navigate("/");
  };

  const login = async (id, pass) => {
    const bodyLogin = { email: id, password: pass };

    await axios
      .post("http://localhost:4000/api/login", bodyLogin)
      .then((res) => {
        const decodedData = jwt.decode(res.data);
        localStorage.setItem("token", res.data);

        if (!res || !decodedData.Account || ![1, 2, 3].includes(decodedData.Account)) {
          setPass(false);
          setLoading(false);
        } else {
          setPass(true);
          setLoading(false);
          setIsLogin(true);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("Account", decodedData.Account);
          localStorage.setItem("_id", decodedData["_id"]);
          localStorage.setItem("Name", `${decodedData["FirstName"]} ${decodedData["LastName"]}`);

          setData({
            _id: decodedData["_id"],
            Account: decodedData.Account,
            Name: `${decodedData["FirstName"]} ${decodedData["LastName"]}`,
          });

          if (decodedData.Account === 1) {
            navigate("/admin/role");
          } else if (decodedData.Account === 2) {
            navigate("/hr/employee");
          } else if (decodedData.Account === 3) {
            navigate(`/employee/${decodedData._id}/personal-info`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setPass(false);
        setLoading(false);
      });
  };

  return (
      <Routes>
        <Route path="/" element={<Login onSubmit={handleSubmit} loading={loading} pass={pass} />}/>
        <Route path="/admin/*" element={<DashboardAdmin data={data} onLogout={handleLogout} />} />
        <Route path="/hr/*" element={<DashboardHR data={data} onLogout={handleLogout} />} />
        <Route path="/employee/*" element={<DashboardEmployee data={data} onLogout={handleLogout} />} />
      </Routes>
  );
};

export default App;
