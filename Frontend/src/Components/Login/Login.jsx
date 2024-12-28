import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { Context } from "../../main";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
  const navigateTo=useNavigate();
  
  useEffect(() =>{
    if(isAuthorized)
      navigateTo("/");
  },[isAuthorized]);


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
      const response=await axios.post("http://localhost:5000/api/v1/user/login",{
        email:formData.email,password:formData.password
    },{withCredentials:true,
       headers:{"Content-Type":"application/json"}
     });
     setIsAuthorized(true);
     toast.success("Login Successfull");
     setUser(response.data.user);
     navigateTo("/");
    } catch (error) {
      console.log("chud gye guru",error);
    }
    
  };

  return (
    <div className="myContainer">
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" className="login-button">
          Login
        </button>
        <div className="form-footer">
        <p>New user?</p>
        <Link to={"/register"}>
            Register here
        </Link>
      </div>
      </form>
    </div>
    
    </div>
    
  );
};

export default Login;
