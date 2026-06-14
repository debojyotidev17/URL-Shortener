import express from "express";
import { getUrls } from "../controllers/geturls.controller.js"
import { deleteUrl } from "../controllers/deleteurl.controller.js"; 

const router = express.Router();

router.get("/", getUrls);
router.delete("/:id", deleteUrl);
export default router;