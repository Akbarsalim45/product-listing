import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios/axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
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
      const response = await Axios.post("/login", userData);
      const { status, message } = await response.data;

      if (status == "success") {
        navigate("/viewproduct");
      }
      if (status == "errorPassword") {
        setErrors({ password: message });
      }
      if (status == "error") {
        setErrors({ email: message });
      }
    }
  }, [errors]);
  const validateForm = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  return (
    <div className="container">
      <div className="login-form-container">
        <form action="">
          <h2>Login</h2>

          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">Email</label>
              <input type="email" name="email" onChange={getUserData} />
            </div>
            <p>{errors.email}</p>
          </div>
          <div className="form-row">
            <div className="form-input">
              <label htmlFor="">password</label>
              <input type="password" name="password" onChange={getUserData} />
            </div>
            <p>{errors.password}</p>
          </div>

          <div className="buttons">
            <button onClick={sendUserData}>Submit</button>
            <Link to="/register">
              <button className="btn-clear">Registration</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
