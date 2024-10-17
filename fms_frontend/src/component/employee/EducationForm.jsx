import React from "react";

const EducationForm = ({ onEducationSubmit, onFormClose }) => {
  return (
    // <div>
    //   <h2>Add Education Details</h2>
    //   <div>
    //     <form onSubmit={onEducationSubmit}>
    //       <div>
    //         <label>School / University</label>
    //         <input type="text" placeholder="School / University" required />
    //       </div>

    //       <div>
    //         <label>Degree</label>
    //         <input type="text" placeholder="Degree" required />
    //       </div>

    //       <div>
    //         <label>Grade</label>
    //         <input type="text" placeholder="Grade" required />
    //       </div>

    //       <div>
    //         <label>Passing Year</label>
    //         <input type="text" placeholder="Passing Year" required />
    //       </div>

    //       <div>
    //         <button type="submit">Submit</button>
    //         <button type="button" onClick={onFormClose}>
    //           Cancel
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div class="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Add Education Details</h2>
  <form onSubmit={onEducationSubmit} class="space-y-4">
    <div class="flex flex-col">
      <label class="text-sm font-semibold mb-1">School / University</label>
      <input
        type="text"
        placeholder="School / University"
        required
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-semibold mb-1">Degree</label>
      <input
        type="text"
        placeholder="Degree"
        required
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-semibold mb-1">Grade</label>
      <input
        type="text"
        placeholder="Grade"
        required
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-semibold mb-1">Passing Year</label>
      <input
        type="text"
        placeholder="Passing Year"
        required
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex space-x-4">
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onFormClose}
        class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
};

export default EducationForm;
