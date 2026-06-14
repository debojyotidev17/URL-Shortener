import { registerUserSchema, loginUserSchema, } from "../validations/user.validation.js";
import { checkUserExistsByEmail, insertUserInDB, UserPassword, } from "../services/user.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken, } from "../utils/jwthelpers.js";
export const signUpUser = async (req, res) => {
    try {
        const result = registerUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: "failure",
                errors: result.error.issues,
            });
            return;
        }
        const userData = result.data;
        if (await checkUserExistsByEmail(userData.email)) {
            res.status(409).json({
                success: "failure",
                message: "User with this email already exists",
            });
            return;
        }
        const hashedPassword = await hashPassword(userData.password);
        userData.password = hashedPassword;
        const userId = await insertUserInDB(userData);
        res.status(201).json({
            success: "success",
            message: `new user with id ${userId} created successfully`,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: "failure",
            message: "Internal server error",
        });
    }
};
export const LoginUser = async (req, res) => {
    try {
        const result = loginUserSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: "failure",
                errors: result.error.issues,
            });
            return;
        }
        const userData = result.data;
        const user = await checkUserExistsByEmail(userData.email);
        if (!user) {
            res.status(401).json({
                success: "failure",
                message: "user with this email does not exist",
            });
            return;
        }
        const data = (await UserPassword(userData.email));
        const isPasswordValid = await comparePassword(userData.password, data.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: "failure",
                message: "Invalid credentials",
            });
            return;
        }
        const payload = { email: user.email, userId: user.id };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, // prevents JS to read the cookie
            sameSite: "strict", // Cookie only sent when the request originates from your own site.
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            success: "success",
            message: "Now you can access this website using your token",
            accessToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: "failure",
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=user.controller.js.map