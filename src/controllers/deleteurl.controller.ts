import { Request, Response } from "express";
import { checkDBforDeletion } from "../services/user.service.js";
import { Ijson } from "../types/types.js";
import { DeleteURL } from "../services/user.service.js";
import { url } from "inspector";

export const deleteUrl = async (req: Request, res: Response) => {
    const { id: UserId } = req.user;
    const urlId = Number(req.params.id);
    if (isNaN(urlId)) {
        return res.status(400).json({
            result: "failure",
            message: "Invalid url ID",
        } as Ijson);
    }
    const result = await checkDBforDeletion(UserId, urlId);
    if (!result) {
        return res.status(400).json({
            result: "failure",
            message: "Invalid url ID",
        } as Ijson);
    }
    try {
        await DeleteURL(urlId);
        res.json({
            result: "Success",
            message: "url deleted successfully",
        } as Ijson);
        return;
    } catch (error) {
        res.status(500).json({ error: "db error" });
        return;
    }
};
