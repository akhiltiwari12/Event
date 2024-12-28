import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { createAttendee, deleteAttendee, getAllEventAttendee, getAllTaskAttendee } from "../Controllers/attendeeController.js";
const router=express.Router();

router.post("/:id/:taskId/create",isAuthenticated,createAttendee);
router.get("/:id/allattendees",isAuthenticated,getAllEventAttendee);
router.get("/:id/:taskId/allattendees",isAuthenticated,getAllTaskAttendee);
router.delete("/:id/:taskId/delete/:attendeeId",isAuthenticated,deleteAttendee);

export default router;