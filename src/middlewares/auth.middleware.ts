import express, { Request, Response, NextFunction } from "express";
import { JwtUserSchema } from "../validations/user.validation.js";
import { Ijson } from "../types/types.js";
import { verifyAccessToken } from "../utils/jwthelpers.js";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const tokenHeader = req.headers["authorization"];

        if (!tokenHeader) {
            res.status(401).json({
                result: "failure",
                message: "Missing token hence not authenticated",
            } as Ijson);
            return;
        }
        if (!tokenHeader.startsWith("Bearer ")) {
            res.status(401).json({
                result: "failure",
                message: "Invalid authorization header",
            } as Ijson);
            return;
        }
        const token = tokenHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                result: "failure",
                message: "Invalid authorization header",
            } as Ijson);
            return;
        }

        try {
            const decoded = verifyAccessToken(token);
            const result = JwtUserSchema.safeParse(decoded);

            if (!result.success) {
                return res.status(401).json({
                    result: "failure",
                    errors: result.error.issues,
                } as Ijson);
            }
            req.user = result.data;
            next();
        } catch (error) {
            console.log("JWT ERROR:", error);

            res.status(401).json({
                result: "failure",
                message: "Invalid or expired token",
            });
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result: "failure",
            message: "Internal server error",
        } as Ijson);
        return;
    }
};

export default authMiddleware;
