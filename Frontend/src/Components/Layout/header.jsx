import React, { useContext, useState } from "react";
import "./header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import {Context} from "../../main"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const navigateTo = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout= async ()=>{
    try {
      if(!isAuthorized)
        navigateTo("/login");
      const response=await axios.get("http://localhost:5000/api/v1/user/logout",{withCredentials:true,headers:{
        "Content-Type":"application/json"
      }});
      setIsAuthorized(false);
      
    toast.success("Logout Successfully");
      setUser({});
      navigateTo("/login");
    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="header">
      <div className="logo">MyEvent</div>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {isAuthorized && <Link onClick={handleLogout}><li>Logout</li></Link>}
        </ul>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <GiHamburgerMenu  />
      </div>
    </header>
  );
};

export default Header;
