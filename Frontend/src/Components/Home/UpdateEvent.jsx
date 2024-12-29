import React, { useContext, useEffect, useState } from "react";
import "./UpdateEvent.css"; // Import the CSS file
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../Layout/footer";
import Header from "../Layout/header";

const UpdateEvent= () => {
   const { id }=useParams();
   console.log(id);
    const navigateTo = useNavigate();
    
    const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
    const [event, setEvent] = useState({
        name: "",
        description: "",
        location: "",
        date: "",
    });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response=await axios.put(`http://localhost:5000/api/v1/event/update/${id}`,{
        name:event.name,desc:event.description,location:event.location,date:event.date
    },{
        withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        }
    );
    toast.success("Event Updated");
    navigateTo(`/show/${id}`);
    } catch (error) {
        console.log(error);
    }
    
  };

  return (
    <>
    <Header></Header>
    <div className="form-container">
      <h1 className="form-heading">Update Event</h1>
      <form className="event-form" onSubmit={handleSubmit}>
        {/* Event Name */}
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event Description */}
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Event Location */}
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event Date */}
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Update Event
        </button>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
};

export default UpdateEvent;
