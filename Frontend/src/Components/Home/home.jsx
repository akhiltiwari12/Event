import React, { useContext, useEffect, useState } from "react";
import "./home.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import Header from "../Layout/header";
import Footer from "../Layout/footer";

const Home = () => {
    const navigateTo = useNavigate();

    const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context);
   
    const [events, setEvents] = useState([]);

  
    const editEvent = (id) => {
        const eventIndex = events.findIndex((event) => event.id === id);
        const newName = prompt("Edit the event name:", events[eventIndex].name);
        if (newName) {
        const updatedEvents = events.map((event) =>
            event.id === id ? { ...event, name: newName } : event
        );
        setEvents(updatedEvents);
        }
    };


    //Delete Code

    // const deleteEvent = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:5000/api/v1/event/delete/${id}`, {
    //             withCredentials: true,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
            
    //         console.log("event deleted");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


    useEffect(()=>{
        if(!isAuthorized)
          navigateTo("/login");
        const fetch = async () => {
            const response=await axios.get("http://localhost:5000/api/v1/event/allevents",{withCredentials:true,headers:{
                "Content-Type":"application/json"
            }});
        setEvents(response.data.events);
            
        }
        fetch();
    },[events]);


    // const handleShow=async(id)=>{
    //     const response
    // }






  return (
    <>
    <div className="events-container">
      <h1 className="heading">Event Management</h1>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event._id} className="event-item">
          <Link to={`/show/${event._id}`}>{event.name}</Link>
            {/* <div className="button-group">
              <button className="edit-button" onClick={() => editEvent(event._id)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => deleteEvent(event._id)}>
                Delete
              </button>
            </div> */}
          </li>
        ))}
      </ul>
     <Link to={"/addevent"}><button style={{backgroundColor:"green",padding:"10px",color:"white",border:"1.5px black", borderRadius:"5px", marginTop:"5px"}}> Add Event</button>
     </Link> 
    </div>
    </>
  );
};

export default Home;
