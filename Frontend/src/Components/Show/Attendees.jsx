import React, { useContext, useEffect, useState } from "react";
import "./Attendees.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";
import Footer from "../Layout/footer";
import Header from "../Layout/header";

const Attendees = () => {
  const {id} = useParams();
  const {taskid} = useParams();

  
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState("");
  const [refresh,setRefresh] = useState(false);
  const navigateTo = useNavigate();

    useEffect(()=>{
    const fetch = async ()=>{
        const response = await axios.get(`http://localhost:5000/api/v1/attendee/${id}/${taskid}/allattendees`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(response.data.attendee);
        setAttendees(response.data.attendee);
    }
    fetch();

  },[refresh]);

  const handleAddAttendee = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`http://localhost:5000/api/v1/attendee/${id}/${taskid}/create`,
        {
          name:newAttendee
        },{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        }
       );
       setNewAttendee("");
       setRefresh(!refresh);
       toast.success("Attendee added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAttendee = async(index) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/attendee/${id}/${taskid}/delete/${index}`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Header/>
    <div className="attendees-container">
      <h2>Manage Attendees</h2>
      <ul className="attendee-list">
        {attendees.length > 0 ? (
          attendees.map((attendee) => (
            <li key={attendee._id} className="attendee-item">
              {attendee.name}
              <button
                onClick={() => handleRemoveAttendee(attendee._id)}
                className="remove-btn"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p>No attendees added yet.</p>
        )}
      </ul>
      <form onSubmit={handleAddAttendee} className="add-attendee-form">
        <input
          type="text"
          placeholder="Add new attendee"
          value={newAttendee}
          onChange={(e) => setNewAttendee(e.target.value)}
          className="attendee-input"
        />
        <button type="submit" className="add-btn">
          Add Attendee
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Attendees;
