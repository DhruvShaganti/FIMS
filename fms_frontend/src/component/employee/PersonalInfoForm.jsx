import React, { useState } from "react";
import axios from "axios";

const PersonalInfoForm = (props) => {
  const [gender, setGender] = useState(props.editData["Gender"]);
  const [email, setEmail] = useState(props.editData["Email"]);
  const [firstName, setFirstName] = useState(props.editData["FirstName"]);
  const [middleName, setMiddleName] = useState(props.editData["MiddleName"]);
  const [lastName, setLastName] = useState(props.editData["LastName"]);
  const [dob, setDob] = useState(props.editData["DOB"].slice(0, 10));
  const [contactNo, setContactNo] = useState(props.editData["ContactNo"]);
  const [emergencyContactNo, setEmergencyContactNo] = useState(props.editData["EmergencyContactNo"] || "");
  const [panCardNo, setPanCardNo] = useState(props.editData["PANcardNo"] || "");
  const [hobbies, setHobbies] = useState(props.editData["Hobbies"] || "");
  const [presentAddress, setPresentAddress] = useState(props.editData["PresentAddress"] || "");
  const [permanentAddress, setPermanentAddress] = useState(props.editData["PermanetAddress"] || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      Gender: gender,
      ContactNo: contactNo,
      EmergencyContactNo: emergencyContactNo,
      Email: email,
      PANcardNo: panCardNo,
      DOB: dob,
      BloodGroup: e.target.bloodGroup.value,
      Hobbies: hobbies,
      PresentAddress: presentAddress,
      PermanetAddress: permanentAddress
    };

    axios
      .put(`http://localhost:4000/api/personal-info/${props.editData["_id"]}`, body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(() => {
        props.onPersonalInfoEditUpdate(props.editData, e);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit PersonalInfo Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            required
            disabled
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Middle Name</label>
          <input
            type="text"
            placeholder="Middle Name"
            required
            disabled
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            disabled
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <fieldset>
            <legend>Gender</legend>
            <label>
              <input
                type="radio"
                value="male"
                name="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  props.onGenderChange(e);
                }}
                checked={gender === "male"}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                name="gender"
                onChange={(e) => {
                  setGender(e.target.value);
                  props.onGenderChange(e);
                }}
                checked={gender === "female"}
                required
              />
              Female
            </label>
          </fieldset>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Contact No</label>
          <input
            type="text"
            placeholder="Contact No"
            required
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Emergency Contact No</label>
          <input
            type="text"
            placeholder="Emergency Contact No"
            required
            value={emergencyContactNo}
            onChange={(e) => setEmergencyContactNo(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>PAN Card No</label>
          <input
            type="text"
            placeholder="PAN Card No"
            required
            value={panCardNo}
            onChange={(e) => setPanCardNo(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>DOB</label>
          <input
            type="date"
            placeholder="DOB"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Blood Group</label>
          <select name="bloodGroup" required>
            <option value="" disabled>Select your option</option>
            <option value="A+" selected={props.editData["BloodGroup"] === "A+"}>A+</option>
            <option value="A-" selected={props.editData["BloodGroup"] === "A-"}>A-</option>
            <option value="B+" selected={props.editData["BloodGroup"] === "B+"}>B+</option>
            <option value="B-" selected={props.editData["BloodGroup"] === "B-"}>B-</option>
            <option value="AB+" selected={props.editData["BloodGroup"] === "AB+"}>AB+</option>
            <option value="AB-" selected={props.editData["BloodGroup"] === "AB-"}>AB-</option>
            <option value="O+" selected={props.editData["BloodGroup"] === "O+"}>O+</option>
            <option value="O-" selected={props.editData["BloodGroup"] === "O-"}>O-</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Hobbies</label>
          <input
            type="text"
            placeholder="Hobbies"
            required
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Present Address</label>
          <textarea
            rows="3"
            placeholder="Present Address"
            required
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Permanent Address</label>
          <textarea
            rows="3"
            placeholder="Permanent Address"
            required
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <button type="submit">Submit</button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button type="button" onClick={props.onFormEditClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
