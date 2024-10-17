import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const Login = ({ onSubmit, pass, loading }) => {
  return (
    // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //   <div style={{ width: '300px', textAlign: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        
    //     <div>
    //       {/* <img src={} alt="Logo" style={{ width: '150px', marginBottom: '20px' }} /> */}
    //     </div>

    //     <div>
    //       <h4>Sign in</h4>
    //     </div>

    //     <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    //       <input
    //         type="text"
    //         placeholder="Email"
    //         required
    //         name="Username"
    //         style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         required
    //         style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
    //       />
    //       <input
    //         type="submit"
    //         value="Sign in"
    //         style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
    //       />
    //       {!pass && <p style={{ color: 'red' }}>Invalid Username or Password</p>}
    //     </form>

    //     {loading && (
    //       <div style={{ marginTop: '20px' }}>
    //         <ScaleLoader size={150} color={"#123abc"} loading={loading} />
    //       </div>
    //     )}
    //   </div>
    // </div>
    
    
    <div className="flex justify-center items-center h-screen bg-gray-100">
  <div className="w-80 text-center border border-gray-300 p-5 rounded-lg bg-white shadow-lg">
    
  


    <div>
      <h4 className="text-xl font-semibold mb-5">Sign In</h4>
    </div>

    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Email"
        required
        name="Username"
        className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <input
        type="submit"
        value="Sign in"
        className="p-3 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition-colors"
      />
      {!pass && <p className="text-red-500 text-sm mt-2">Invalid Username or Password</p>}
    </form>

    {loading && (
      <div className="mt-5">
        <ScaleLoader size={150} color={"#123abc"} loading={loading} />
      </div>
    )}
  </div>
</div>

  );
};

export default Login;
