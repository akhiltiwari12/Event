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
    const navigateTo = useNavigate();
    const [event, setEvent] = useState({
        name: "",
        desc: "",
        location: "",
        date: "",
    });
    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`http://localhost:5000/api/v1/event/show/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setEvent({
                name: response.data.event.name,
                desc: response.data.event.desc,
                location: response.data.event.location,
                date: response.data.event.date,
            });
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        const fetchAttendees = async () => {
            const response = await axios.get(`http://localhost:5000/api/v1/attendee/${id}/allattendees`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setAttendees(response.data.attendee);
        };
        fetchAttendees();
    }, [id]);

    const deleteEvent = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/event/delete/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            });
            toast.success("Event Deleted");
            navigateTo("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (<>
   <Header />
        <div className="event-wrapper">
            <div className="event-details-container">
                <h1 className="event-title">{event.name}</h1>
                <p className="event-description">{event.desc}</p>
                <div className="event-info">
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                </div>
                <div className="attendees">
                    <h3>Attendees:</h3>
                    {attendees.length === 0 && <h4>No Attendees Yet!</h4>}
                    <ul>
                        {attendees.map((attendee) => (
                            <li key={attendee._id}><GoDotFill /> {attendee.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="button-group">
                    <Link to={`/edit/${id}`}><button className="edit-button">Edit</button></Link>
                    <button className="delete-button" onClick={deleteEvent}>Delete</button>
                    <Link to={`/task/${id}`}><button className="edit-button">My Task</button></Link>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default ShowEvent;
