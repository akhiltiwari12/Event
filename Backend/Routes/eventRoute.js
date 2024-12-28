import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { createEvent, deleteEvent, getAllEvents, showEvent, updateEvent } from "../Controllers/eventController.js";
const router=express.Router();

router.post("/create",isAuthenticated,createEvent);
router.get("/allevents",isAuthenticated,getAllEvents);
router.put("/update/:id",isAuthenticated,updateEvent);
router.delete("/delete/:id",isAuthenticated,deleteEvent);
router.get("/show/:id",isAuthenticated,showEvent);

export default router;