import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwthelpers.js";

export const refreshToken = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const refreshToken = req.headers.authorization?.split(" ")[1];

        if (!refreshToken) {
            res.status(401).json({
                success: "failure",
                message: "Refresh token not found",
            });
            return;
        }

        const payload = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET!,
        ) as {
            userId: number;
            email: string;
        };

        const accessToken = generateAccessToken({
            userId: payload.userId,
            email: payload.email,
        });

        res.status(200).json({
            success: "success",
            accessToken,
        });
    } catch (error) {
        console.error(error);

        res.status(403).json({
            success: "failure",
            message: "Invalid or expired refresh token",
        });
    }
};
