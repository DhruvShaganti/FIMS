import React from 'react';
import axios from 'axios';

const WorkExperienceForm = ({ onWorkExperienceSubmit, onFormClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onWorkExperienceSubmit(event);
  };

  return (
    <div className="p-5">
  <h2 className="text-2xl font-bold mb-6">Add Work Experience Details</h2>
  <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
    {/* Company Name */}
    <div className="mb-4">
      <label htmlFor="companyName" className="block mb-2 font-medium">Company Name</label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        placeholder="Company Name"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* Designation */}
    <div className="mb-4">
      <label htmlFor="designation" className="block mb-2 font-medium">Designation</label>
      <input
        type="text"
        id="designation"
        name="designation"
        placeholder="Designation"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* From Date */}
    <div className="mb-4">
      <label htmlFor="fromDate" className="block mb-2 font-medium">From Date</label>
      <input
        type="date"
        id="fromDate"
        name="fromDate"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* To Date */}
    <div className="mb-4">
      <label htmlFor="toDate" className="block mb-2 font-medium">To Date</label>
      <input
        type="date"
        id="toDate"
        name="toDate"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-between mt-6">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onFormClose}
        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

    // <div style={{ padding: '20px' }}>
    //   <h2>Add Work Experience Details</h2>
    //   <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="companyName" style={{ display: 'block', marginBottom: '5px' }}>Company Name</label>
    //       <input
    //         type="text"
    //         id="companyName"
    //         name="companyName"
    //         placeholder="Company Name"
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="designation" style={{ display: 'block', marginBottom: '5px' }}>Designation</label>
    //       <input
    //         type="text"
    //         id="designation"
    //         name="designation"
    //         placeholder="Designation"
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="fromDate" style={{ display: 'block', marginBottom: '5px' }}>From Date</label>
    //       <input
    //         type="date"
    //         id="fromDate"
    //         name="fromDate"
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="toDate" style={{ display: 'block', marginBottom: '5px' }}>To Date</label>
    //       <input
    //         type="date"
    //         id="toDate"
    //         name="toDate"
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>

    //     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    //       <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit</button>
    //       <button
    //         type="button"
    //         onClick={onFormClose}
    //         style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px' }}
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default WorkExperienceForm;
