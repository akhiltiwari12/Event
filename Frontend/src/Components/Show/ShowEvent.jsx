import React, { useContext, useEffect, useState } from "react";
import "./ShowEvent.css";
import { Context } from "../../main";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Task from "./Task";
import { GoDotFill } from "react-icons/go";
import toast from "react-hot-toast";
import Header from "../Layout/header";
import Footer from "../Layout/footer";

const ShowEvent = () => {
    const { id } = useParams();
    const navigateTo=useNavigate();
  const [event,setEvent]=useState({
    name:"",
    desc:"",
    location:"",
    date:"",
  });
  const [attendees,setAttendees]=useState([]);
  useEffect(() =>{
    const fetch=async()=>{
        const response=await axios.get(`http://localhost:5000/api/v1/event/show/${id}`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        setEvent({
            name:response.data.event.name,
            desc:response.data.event.desc,
            location:response.data.event.location,
            date:response.data.event.date,
        })
    }
    fetch();
  },[]);
  
  useEffect(() =>{
    const fetch=async()=>{
        const response=await axios.get(`http://localhost:5000/api/v1/attendee/${id}/allattendees`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        })
        setAttendees(response.data.attendee);
    }
    fetch();
  },[]);



   const deleteEvent = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/event/delete/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
                
    toast.success("Event Deleted");
            navigateTo("/");
        
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className="myBox">
    <Header />
    <div className="event-details-container">
      <h1 className="event-name">{event.name}</h1>
      <p className="event-description">{event.desc}</p>
      <div className="event-info">
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Date:</strong> {event.date}</p>
      </div>
      <div className="event-attendees">
        <h3>Attendees:</h3>
        <ul>
        
          {attendees.map((attendee) => (
            
            <li style={{marginTop:"-2.5px"}} key={attendee._id}><GoDotFill /> {attendee.name}<br /></li>
          ))}
        </ul>
      </div>
          <br />
        <div className="button-group">
            <button className="edit-button"><Link style={{color:"white"}} to={`/edit/${id}`} >
                Edit
              </Link></button> 
              <button className="delete-button" onClick={() =>{deleteEvent()} }>
                Delete
              </button>
            </div>
    </div>



          <Task  />
          <Footer />
    </div>
  );
};

export default ShowEvent;
