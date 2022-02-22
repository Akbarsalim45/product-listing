import React, { useEffect, useState } from "react";
import "./Register.css";
import Axios from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();
  const getUserData = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const sendUserData = async (event) => {
    event.preventDefault();
    setErrors(validateForm(userData));
    setSubmit(true);
    
  };
  useEffect(async () => {
    
    if (Object.keys(errors).length == 0 && submit) {
      console.log(Object.keys(errors).length);
      const response = await Axios.post("/register", userData);
      const { status, message } = await response.data;

      if (status == "success") {
        navigate("/login");
      } else {
        setErrors({ email: message });
      }
    }
  }, [errors]);
  const validateForm = (data) => {
    
    let errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (!data.place) {
      errors.place = "Place is required";
    }

    return errors;
  };
  const clearData = () => {
    

    setUserData({});
  };

  return (
    <div className="container">
      <div className="form-container">
        <form action="">
          <h2>Registration</h2>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Name</label>
              <input
                type="text"
                name="name"
                onChange={getUserData}
                value={userData.name}
              />
            </div>
            <p>{errors.name}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                onChange={getUserData}
                value={userData.email}
              />
            </div>
            <p>{errors.email}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">password</label>
              <input
                type="password"
                name="password"
                onChange={getUserData}
                value={userData.password}
              />
            </div>
            <p>{errors.password}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Place</label>
              <input
                type="text"
                name="place"
                onChange={getUserData}
                value={userData.place}
              />
            </div>
            <p>{errors.place}</p>
          </div>

          <div className="buttons">
            <button type="submit" onClick={sendUserData}>
              Submit
            </button>
            <button className="btn-clear" onClick={clearData}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
