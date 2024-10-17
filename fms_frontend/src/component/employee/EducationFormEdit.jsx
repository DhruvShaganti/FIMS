import React, { useState } from "react";

const EducationFormEdit = ({ editData, onEducationEditUpdate, onFormEditClose }) => {
  const [schoolUniversity, setSchoolUniversity] = useState(editData["SchoolUniversity"]);
  const [degree, setDegree] = useState(editData["Degree"]);
  const [grade, setGrade] = useState(editData["Grade"]);
  const [passingOfYear, setPassingOfYear] = useState(editData["PassingOfYear"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEducationEditUpdate(editData, e);
  };

  return (
    // <div>
    //   <h2>Edit Education Details</h2>

    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlFor="schoolUniversity">School / University</label>
    //       <input
    //         id="schoolUniversity"
    //         type="text"
    //         placeholder="School / University"
    //         required
    //         value={schoolUniversity}
    //         onChange={(e) => setSchoolUniversity(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="degree">Degree</label>
    //       <input
    //         id="degree"
    //         type="text"
    //         placeholder="Degree"
    //         required
    //         value={degree}
    //         onChange={(e) => setDegree(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="grade">Grade</label>
    //       <input
    //         id="grade"
    //         type="text"
    //         placeholder="Grade"
    //         required
    //         value={grade}
    //         onChange={(e) => setGrade(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <label htmlFor="passingOfYear">Passing Of Year</label>
    //       <input
    //         id="passingOfYear"
    //         type="text"
    //         placeholder="Passing Of Year"
    //         required
    //         value={passingOfYear}
    //         onChange={(e) => setPassingOfYear(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <button type="submit">Update</button>
    //       <button type="button" onClick={onFormEditClose}>
    //         Cancel
    //       </button>
    //     </div>
    //   </form>
    // </div>
    <div class="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Edit Education Details</h2>

  <form onSubmit={handleSubmit} class="space-y-4">
    <div class="flex flex-col">
      <label htmlFor="schoolUniversity" class="text-sm font-semibold mb-1">School / University</label>
      <input
        id="schoolUniversity"
        type="text"
        placeholder="School / University"
        required
        value={schoolUniversity}
        onChange={(e) => setSchoolUniversity(e.target.value)}
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label htmlFor="degree" class="text-sm font-semibold mb-1">Degree</label>
      <input
        id="degree"
        type="text"
        placeholder="Degree"
        required
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label htmlFor="grade" class="text-sm font-semibold mb-1">Grade</label>
      <input
        id="grade"
        type="text"
        placeholder="Grade"
        required
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex flex-col">
      <label htmlFor="passingOfYear" class="text-sm font-semibold mb-1">Passing Of Year</label>
      <input
        id="passingOfYear"
        type="text"
        placeholder="Passing Of Year"
        required
        value={passingOfYear}
        onChange={(e) => setPassingOfYear(e.target.value)}
        class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="flex space-x-4">
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update
      </button>
      <button
        type="button"
        onClick={onFormEditClose}
        class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  );
};

export default EducationFormEdit;
