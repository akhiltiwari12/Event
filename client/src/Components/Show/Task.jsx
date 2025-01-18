import React, { useContext, useEffect, useState } from "react";
import "./Task.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const Task = () => {
    const {id}=useParams();
  const [tasks, setTasks] = useState([]);
  const navigateTo = useNavigate();

  useEffect(()=>{
    const fetch=async()=>{
        const response=await axios.get(`http://localhost:5000/api/v1/task/${id}/alltasks`,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        setTasks(response.data.tasks);
  }
  fetch();
},[tasks]);



    const [status,setStatus] = useState("Pending");

  const handleDelete = async(index) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/task/${id}/delete/${index}`,{
        withCredentials:true,
        headers:{
            "Content-Type":"application/json",
        }
    });
    toast.success("Task Deleted");
  } catch (error) {
    console.log(error);
  }
  };





  const handleStatusChange = async (index, newStatus) => {
    try {
        await axios.put(`http://localhost:5000/api/v1/task/${id}/status/${index}`,{
            status:newStatus
        },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        setStatus(newStatus);
    } catch (error) {
        console.log(error);
    }
  };

  
  return (
    <div className="task-table-container">
      <h1>Task List</h1>
      <table  className="task-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.deadline}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <div className="attendee-column">
                <Link to={`/${id}/${task._id}/attendees`}><button className="remove-attendee-btn">Attendees</button></Link>
                  {/* <ul className="attendee-list">
                    {attendees.map((attendee, attendeeIndex) => (
                      <li key={attendeeIndex}>
                        {attendee}{" "}
                        <button
                          className="remove-attendee-btn"
                          onClick={() =>
                            handleRemoveAttendee(taskIndex, attendeeIndex)
                          }
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="add-attendee">
                    <input
                      type="text"
                      placeholder="Add Attendee"
                      value={newAttendee}
                      onChange={(e) => setNewAttendee(e.target.value)}
                    />
                    <button onClick={() => handleAddAttendee(taskIndex)}>
                      Add
                    </button>
                  </div> */}
                </div>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/${id}/addtask`}><button className="add-task-btn" >Add Task</button></Link>
    </div>
  );
};

export default Task;
