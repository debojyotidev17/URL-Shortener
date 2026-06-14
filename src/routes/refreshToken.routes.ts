import express from "express";
import { refreshToken } from "../controllers/refreshtoken.controller.js"
const router = express.Router();

router.post("/", refreshToken);
export default router;
