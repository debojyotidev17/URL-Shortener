import { Request, Response } from "express";
import { getAllurls } from "../services/user.service.js";
import { Ijson } from "../types/types.js";

export const getUrls = async (req: Request, res: Response) => {
    const { userId } = req.user;
    try {
        const data = await getAllurls(userId);
        if (!data) {
            res.json({
                result: "success",
                message: "no url from this user",
            } as Ijson);
            return;
        }
        res.json({
            result: "success",
            message: "Here are all the urls",
            data,
        } as Ijson);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: "failure",
            message: "Internal server error",
        } as Ijson);
        return;
    }
};
