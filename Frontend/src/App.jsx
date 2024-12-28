import React from 'react'
import SignUp from './Components/pages/SignUp'
import LoginPage from './Components/pages/LoginPage'
import HomePage from './Components/pages/HomePage'
import AddEvent from './Components/Home/AddEvent'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AddTask from "./Components/Show/AddTaskForm"

import UpdateEvent from './Components/Home/UpdateEvent'
import ShowEvent from './Components/Show/ShowEvent'
import Attendees from './Components/Show/Attendees'

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/addevent" element={<AddEvent/>} />
          <Route path="/show/:id" element={<ShowEvent />} />
          <Route path="/edit/:id" element={<UpdateEvent />} />
          <Route path="/:id/addtask" element={<AddTask/>} />
          <Route path="/:id/:taskid/attendees" element={<Attendees/>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
