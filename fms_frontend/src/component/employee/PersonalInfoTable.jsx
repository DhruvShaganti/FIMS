import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PersonalInfoTable = ({ data, onEditPersonalInfo, onAddPersonalInfo, back }) => {
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersonalInfoData = () => {
      axios
        .get(`http://localhost:4000/api/personal-info/${data["_id"]}`, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((response) => {
          const data = response.data;
          const temp = {
            data,
            FirstName: data["FirstName"] || "Not Available",
            MiddleName: data["MiddleName"] || "Not Available",
            LastName: data["LastName"] || "Not Available",
            Gender: data["Gender"] || "Not Available",
            ContactNo: data["ContactNo"] || "Not Available",
            Email: data["Email"] || "Not Available",
            PANcardNo: data["PANcardNo"] || "Not Available",
            DOB: data["DOB"]?.slice(0, 10) || "Not Available",
            Hobbies: data["Hobbies"] || "Not Available",
            PresentAddress: data["PresentAddress"] || "Not Available",
          };
          setPersonalInfoData([temp]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    loadPersonalInfoData();
  }, [data]);

  const renderEditButton = (data) => {
    if (back) return null;
    return (
      <button onClick={() => onEditPersonalInfo(data)}>
        Edit
      </button>
    );
  };

  return (
    // <div>
    //   <h2>
    //     Employee Personal Details {back ? `of ${data["FirstName"]} ${data["LastName"]}` : ""}
    //   </h2>
    //   {back && (
    //     <Link to="/hr/employee">
    //       <button>
    //         Back
    //       </button>
    //     </Link>
    //   )}
    //   <div style={{ clear: 'both' }} />
    //   {loading ? (
    //     <div style={{ textAlign: 'center', marginTop: '45px' }}>
    //       <div style={{ display: 'inline-block', border: '5px solid red', borderRadius: '50%', width: '50px', height: '50px', borderTop: '5px solid transparent', animation: 'spin 1s linear infinite' }} />
    //     </div>
    //   ) : (
    //     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //       <thead>
    //         <tr>
    //           <th>First Name</th>
    //           <th>Middle Name</th>
    //           <th>Last Name</th>
    //           <th>Gender</th>
    //           <th>Contact No</th>
    //           <th>Email</th>
    //           <th>PAN Card No</th>
    //           <th>DOB</th>
    //           <th>Hobbies</th>
    //           <th>Present Address</th>
    //           <th>Edit</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {personalInfoData.map((item, index) => (
    //           <tr key={index}>
    //             <td>{item.FirstName}</td>
    //             <td>{item.MiddleName}</td>
    //             <td>{item.LastName}</td>
    //             <td>{item.Gender}</td>
    //             <td>{item.ContactNo}</td>
    //             <td>{item.Email}</td>
    //             <td>{item.PANcardNo}</td>
    //             <td>{item.DOB}</td>
    //             <td>{item.Hobbies}</td>
    //             <td>{item.PresentAddress}</td>
    //             <td>{renderEditButton(item.data)}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Employee Personal Details {back ? `of ${data.FirstName} ${data.LastName}` : ""}
      </h2>
      {back && (
        <Link to="/hr/employee">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">
            Back
          </button>
        </Link>
      )}
      <div className="clear-both" />
      {loading ? (
        <div className="flex justify-center mt-12">
          <div className="animate-spin border-4 border-red-500 border-t-transparent rounded-full w-12 h-12" />
        </div>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">First Name</th>
              <th className="border border-gray-300 p-2 text-left">Middle Name</th>
              <th className="border border-gray-300 p-2 text-left">Last Name</th>
              <th className="border border-gray-300 p-2 text-left">Gender</th>
              <th className="border border-gray-300 p-2 text-left">Contact No</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">PAN Card No</th>
              <th className="border border-gray-300 p-2 text-left">DOB</th>
              <th className="border border-gray-300 p-2 text-left">Hobbies</th>
              <th className="border border-gray-300 p-2 text-left">Present Address</th>
              <th className="border border-gray-300 p-2 text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            {personalInfoData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{item.FirstName}</td>
                <td className="border border-gray-300 p-2">{item.MiddleName}</td>
                <td className="border border-gray-300 p-2">{item.LastName}</td>
                <td className="border border-gray-300 p-2">{item.Gender}</td>
                <td className="border border-gray-300 p-2">{item.ContactNo}</td>
                <td className="border border-gray-300 p-2">{item.Email}</td>
                <td className="border border-gray-300 p-2">{item.PANcardNo}</td>
                <td className="border border-gray-300 p-2">{item.DOB}</td>
                <td className="border border-gray-300 p-2">{item.Hobbies}</td>
                <td className="border border-gray-300 p-2">{item.PresentAddress}</td>
                <td className="border border-gray-300 p-2">
                  {renderEditButton(item.data)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonalInfoTable;
