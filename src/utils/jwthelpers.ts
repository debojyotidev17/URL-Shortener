import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/types.js";

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "45m",
    });
};

export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d",
    });
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
};
