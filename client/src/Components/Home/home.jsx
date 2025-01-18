import React, { useContext, useEffect, useState } from "react";
import "./home.css"; // Import the new CSS file
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import Header from "../Layout/header";
import Footer from "../Layout/footer";

const Home = () => {
  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
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

  useEffect(() => {
    if (!isAuthorized) navigateTo("/login");

    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/api/v1/event/allevents", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEvents(response.data.events);
    };
    fetch();
  }, [events]);

  return (
    <>
      <div className="home-container">
  
        <div className="content-wrapper">
          <h1 className="page-title">Event Management</h1>
          <div className="event-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <Link to={`/show/${event._id}`} className="event-title">
                  {event.name}
                </Link>
              
              </div>
            ))}
          </div>
          <Link to={"/addevent"} className="add-event-btn">
            Add Event
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
