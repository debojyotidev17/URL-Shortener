import { Request, Response } from "express";
import { checkShortCodeInDB } from "../services/user.service.js";
import { Ijson } from "../types/types.js";

export const shortCode = async (req: Request, res: Response) => {
    try {
        const shortCode = req.params.shortcode as string;
        const result = await checkShortCodeInDB(shortCode);
        if (!result) {
            return res.status(400).json({
                result: "failure",
                message: "Invalid Short Code",
            } as Ijson);
        }
        res.redirect(result.Link);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            result: "failure",
            message: "Internal server error",
        } as Ijson);
    }
};