import db from "../db/index.js";
import { user } from "../models/schema.js";
import { eq } from "drizzle-orm";
export const checkUserExistsByEmail = async (email) => {
    const [result] = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);
    return result;
};
export const insertUserInDB = async (data) => {
    const [userId] = await db
        .insert(user)
        .values(data)
        .returning({ id: user.id });
    return userId;
};
export const UserPassword = async (email) => {
    const [result] = await db
        .select({ password: user.password })
        .from(user)
        .where(eq(user.email, email));
    return result;
};
//# sourceMappingURL=user.service.js.map