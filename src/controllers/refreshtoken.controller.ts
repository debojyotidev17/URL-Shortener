import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwthelpers.js";

export const refreshToken = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

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

        const newRefreshToken = generateRefreshToken(payload);

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true, // prevents JS to read the cookie
            sameSite: "strict", // Cookie only sent when the request originates from your own site.
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: "success",
            accessToken,
        });
    } catch (error) {
        res.clearCookie("refreshToken");

        res.status(403).json({
            success: "failure",
            message: "Invalid or expired refresh token",
        });
    }
};
