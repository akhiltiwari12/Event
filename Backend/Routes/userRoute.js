import express from "express";
import { login, logout, me, signUp } from "../Controllers/userController.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
const router=express.Router();

router.post("/signup",signUp);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/me",isAuthenticated,me);


export default router;