import express from "express"
import { login, logout, register } from "../controller/User.controller.js";

const router =express.Router();


router.post("/user",register)
router.post("/login",login)
router.get("/logout",logout)

export default router;