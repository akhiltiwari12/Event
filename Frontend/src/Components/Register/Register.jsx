import React, { useContext, useState } from "react";
import "./register.css";
import axios from "axios";
import {Context} from "../../main"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:5000/api/v1/user/signup",{
        name:formData.name,email:formData.email,password:formData.password
    },{withCredentials:true,
       headers:{"Content-Type":"application/json"}
     });
     toast.success("Register Successfull");
     setIsAuthorized(true);
     setUser(response.data.user);
     navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myContainer" >
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
        <div className="form-footer">
        <p>Already registered?</p>
        <Link to="/login">
            Login
        </Link>
      </div>
      </form>
    </div>
    </div>
  );
};

export default Register;
