import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RingLoader } from 'react-spinners';

const LeaveApplicationHRTable = ({ onEditLeaveApplicationHR }) => {
  const [leaveApplicationHRData, setLeaveApplicationHRData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    loadLeaveApplicationHRData();
  }, []);

  const loadLeaveApplicationHRData = () => {
    axios
      .get('http://localhost:4000/api/leave-application-hr/', {
        headers: {
          authorization: localStorage.getItem('token') || ''
        }
      })
      .then(response => {
        const data = response.data;
        const formattedData = data.map(item => ({
          EmployeeCode: item.employee[0].EmployeeCode,
          Name: `${item.employee[0].FirstName} ${item.employee[0].LastName}`,
          Leavetype: item.Leavetype,
          FromDate: item.FromDate.slice(0, 10),
          ToDate: item.ToDate.slice(0, 10),
          Reasonforleave: item.Reasonforleave,
          Status: status(item.Status),
          id: item._id,
          employeeId: item.employee[0]._id
        }));
        setRowData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const status = (s) => {
    switch (s) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const onLeaveApplicationHRDelete = (employeeId, leaveId) => {
    if (window.confirm('Are you sure to delete this record?')) {
      axios
        .delete(`http://localhost:4000/api/leave-application-hr/${employeeId}/${leaveId}`, {
          headers: {
            authorization: localStorage.getItem('token') || ''
          }
        })
        .then(() => {
          loadLeaveApplicationHRData(); // Refresh the data after deletion
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    // <div>
    //   <h2>Employee Leave Application Details</h2>

    //   {loading ? (
    //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}>
    //       <RingLoader size={50} color={'#0000ff'} loading={true} />
    //     </div>
    //   ) : (
    //     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //       <thead>
    //         <tr>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Employee Code</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Leave Type</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>From Date</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>To Date</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Reason for Leave</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Edit</th>
    //           <th style={{ border: '1px solid black', padding: '8px' }}>Delete</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {rowData.map((data, index) => (
    //           <tr key={index}>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.EmployeeCode}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.Name}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.Leavetype}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.FromDate}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.ToDate}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.Reasonforleave}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>{data.Status}</td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>
    //               <button onClick={() => onEditLeaveApplicationHR(data)}>Edit</button>
    //             </td>
    //             <td style={{ border: '1px solid black', padding: '8px' }}>
    //               <button onClick={() => onLeaveApplicationHRDelete(data.employeeId, data.id)}>Delete</button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}
    // </div>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Employee Leave Application Details</h2>

      {loading ? (
        <div className="flex justify-center mt-12">
          <RingLoader size={50} color={'#0000ff'} loading={true} />
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-black p-2">Employee Code</th>
              <th className="border border-black p-2">Name</th>
              <th className="border border-black p-2">Leave Type</th>
              <th className="border border-black p-2">From Date</th>
              <th className="border border-black p-2">To Date</th>
              <th className="border border-black p-2">Reason for Leave</th>
              <th className="border border-black p-2">Status</th>
              <th className="border border-black p-2">Edit</th>
              <th className="border border-black p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-black p-2">{data.EmployeeCode}</td>
                <td className="border border-black p-2">{data.Name}</td>
                <td className="border border-black p-2">{data.Leavetype}</td>
                <td className="border border-black p-2">{data.FromDate}</td>
                <td className="border border-black p-2">{data.ToDate}</td>
                <td className="border border-black p-2">{data.Reasonforleave}</td>
                <td className="border border-black p-2">{data.Status}</td>
                <td className="border border-black p-2">
                  <button
                    onClick={() => onEditLeaveApplicationHR(data)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-black p-2">
                  <button
                    onClick={() => onLeaveApplicationHRDelete(data.employeeId, data.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveApplicationHRTable;
