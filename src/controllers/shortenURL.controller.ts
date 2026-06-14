import { Request, Response } from "express";
import { Ijson } from "../types/types.js";
import { nanoid } from "nanoid";
import { insertShortCodeInDB } from "../services/user.service.js";

export const shortenURL = async (req: Request, res: Response) => {
    try {
        const { userId } = req.user;
        let { shortCode, Link } = req.body;

        if (!Link) {
            res.status(417).json({
                result: "failure",
                message: "No link provided in the req body",
            } as Ijson);
            return;
        }

        if (!shortCode) {
            shortCode = nanoid(7);
        }
        const result = await insertShortCodeInDB(shortCode, Link, userId);

        return res.status(201).json({
            result: "success",
            message: `short link created with short code ${shortCode} and urlId ${result?.id}`,
        } as Ijson);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: "failure",
            message: "Internal server error",
        } as Ijson);
        return;
    }
};
