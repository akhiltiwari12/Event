import express from "express";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import { createTask, deleteTask, getAllTask, taskStatus } from "../Controllers/taskController.js";
const router=express.Router();

router.post("/:id/create",isAuthenticated,createTask);
router.get("/:id/alltasks",isAuthenticated,getAllTask);
// router.put("/:id/update/:taskId",isAuthenticated,updateTask);
router.delete("/:id/delete/:taskId",isAuthenticated,deleteTask);
router.put("/:id/status/:taskId",isAuthenticated,taskStatus);

export default router;