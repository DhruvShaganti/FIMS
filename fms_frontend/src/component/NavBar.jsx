import React from 'react'
import Logo from '../img/logo.png';
import Cvrlogo from '../img/cvrlogo.png';
import Switch from 'react-switch';

const NavBar = ({ checked, handleChange, loginInfo, onClick, onLogout }) => {
  // console.log(loginInfo)
  return (
    <div className="flex  items-center p-3 bg-gray-800 text-white">
  <div className="flex items-center space-x-4">
    <img src={Logo} alt="Logo" className="h-12 w-12" />
    <div className="flex items-center space-x-2">
      <Switch 
        checked={checked}
        onChange={handleChange}
        onColor="#404e67"
        onHandleColor="#ffffff"
        handleDiameter={10}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={17}
        width={35}
      />
      <span className="text-sm">{loginInfo["Role"]}</span>
    </div>
  </div>
  <div class="ml-72"><img src={Cvrlogo} alt="CVRLogo" className="h-12 w-12" /></div>
    
  <div class="ml-12">
  <p class="text-4xl">CVR COLLEGE OF ENGINEERING</p>
  </div>
  {/* <div class="flex justify-between items-center bg-gray-800 -ml-400">
  <div class="bg-white-500 -ml-400"></div>
  <div class="bg-gray-800 text-white -ml-400"></div>
</div> */}


<div className="absolute top-0 right-0 flex space-x-4 m-4">

    <button onClick={onClick} className="text-sm hover:underline">
      {loginInfo["Name"]}
    </button>
    <button
      onClick={onLogout}
      className="text-sm px-3 py-1 bg-red-600 rounded hover:bg-red-700"
    >
      Log Out
    </button>
  </div>
</div>



  );
};

export default NavBar;
