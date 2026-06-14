import express from "express";
import { shortenURL } from "../controllers/shortenURL.controller.js"
const router = express.Router();

router.post("/", shortenURL);
export default router;