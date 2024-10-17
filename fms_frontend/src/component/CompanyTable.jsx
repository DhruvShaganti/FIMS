import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCompanyTable = ({ onEditCompany, onAddCompany }) => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load company data
  const loadCompanyData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/company", {
        headers: { authorization: localStorage.getItem("token") || "" }
      });

      const formattedData = response.data.map((data) => ({
        _id: data["_id"],
        CompanyName: data["CompanyName"],
        Address: data["Address"],
        CountryName: data["city"][0]["state"][0]["country"][0]["CountryName"],
        StateName: data["city"][0]["state"][0]["StateName"],
        CityName: data["city"][0]["CityName"],
        PostalCode: data["PostalCode"],
        Website: data["Website"],
        Email: data["Email"],
        ContactPerson: data["ContactPerson"],
        ContactNo: data["ContactNo"],
        FaxNo: data["FaxNo"],
        PanNo: data["PanNo"],
        GSTNo: data["GSTNo"],
        CINNo: data["CINNo"],
      }));

      setCompanyData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Delete company
  const onCompanyDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      try {
        await axios.delete(`http://localhost:4000/api/company/${id}`, {
          headers: { authorization: localStorage.getItem("token") || "" }
        });
        loadCompanyData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, []);

  return (
    <div>
      <h2>Company Details</h2>
      <button onClick={onAddCompany}>Add Company</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Website</th>
              <th>Email</th>
              <th>Contact Person</th>
              <th>Contact No</th>
              <th>Fax No</th>
              <th>Pan No</th>
              <th>GST No</th>
              <th>CIN No</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {companyData.map((company) => (
              <tr key={company._id}>
                <td>{company.CompanyName}</td>
                <td>{company.Address}</td>
                <td>{company.CountryName}</td>
                <td>{company.StateName}</td>
                <td>{company.CityName}</td>
                <td>{company.PostalCode}</td>
                <td>{company.Website}</td>
                <td>{company.Email}</td>
                <td>{company.ContactPerson}</td>
                <td>{company.ContactNo}</td>
                <td>{company.FaxNo}</td>
                <td>{company.PanNo}</td>
                <td>{company.GSTNo}</td>
                <td>{company.CINNo}</td>
                <td>
                  <button onClick={() => onEditCompany(company)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => onCompanyDelete(company._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCompanyTable;
