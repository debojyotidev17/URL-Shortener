import { Request, Response } from "express";
import {
    registerUserSchema,
    loginUserSchema,
} from "../validations/user.validation.js";
import {
    checkUserExistsByEmail,
    insertUserInDB,
    UserPassword,
} from "../services/user.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwthelpers.js";
import { Ijson } from "../types/types.js";
import { JwtPayload } from "../types/types.js";

type typeData = {
    password: string;
};

export const signUpUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const result = registerUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                result: "failure",
                errors: result.error.issues,
            } as Ijson);
            return;
        }

        const userData = result.data;

        if (await checkUserExistsByEmail(userData.email)) {
            res.status(409).json({
                result: "failure",
                message: "User with this email already exists",
            } as Ijson);
            return;
        }

        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;

        const data = await insertUserInDB(userData);
        res.status(201).json({
            result: "success",
            message: `new user with id ${data.id} created successfully`,
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

export const LoginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = loginUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                result: "failure",
                errors: result.error.issues,
            } as Ijson);
            return;
        }
        const userData = result.data;
        const user = await checkUserExistsByEmail(userData.email);
        if (!user) {
            res.status(401).json({
                result: "failure",
                message: "user with this email does not exist",
            } as Ijson);
            return;
        }
        const data = (await UserPassword(userData.email)) as typeData;
        const isPasswordValid = await comparePassword(
            userData.password,
            data.password,
        );
        if (!isPasswordValid) {
            res.status(401).json({
                result: "failure",
                message: "Invalid credentials",
            } as Ijson);
            return;
        }
        const payload = {
            email: user.email,
            userId: user.id,
        } as JwtPayload;
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // prevents JS to read the cookie
            sameSite: "strict", // Cookie only sent when the request originates from your own site.
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            result: "success",
            message: "Now you can access this website using your token",
            accessToken,
            refreshToken,
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
