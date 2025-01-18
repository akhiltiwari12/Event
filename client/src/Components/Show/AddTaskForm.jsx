import React, { useContext, useEffect, useState } from "react";
import "./AddTaskForm.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";
import Footer from "../Layout/footer";
import Header from "../Layout/header";

const AddTask = () => {
  const navigateTo=useNavigate();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const {id} = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response=await axios.post(`http://localhost:5000/api/v1/task/${id}/create`,{
            name,deadline
        },{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    toast.success("Task Added");
        setName(response.data.task.name);
        setDeadline(response.data.task.deadline);
        navigateTo(`/task/${id}`);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
    <Header/>
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="task-name">Task Name</label>
          <input
            type="text"
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter task name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="task-deadline">Deadline</label>
          <input
            type="text"
            id="task-deadline"
            placeholder="MM/DD/YYYY"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default AddTask;
