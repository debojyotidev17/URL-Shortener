import express from "express";
import { shortCode } from "../controllers/getshortcode.js";
const router = express.Router();

router.get("/", shortCode);
export default router;
