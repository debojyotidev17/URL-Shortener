import express from "express";
import { signUpUser, LoginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", LoginUser);

export default router;