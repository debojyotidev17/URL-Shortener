import db from "../db/index.js";
import { user, url } from "../models/schema.js";
import { eq } from "drizzle-orm";

export const checkUserExistsByEmail = async (email: string) => {
    const [result] = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);
    return result;
};

export const insertUserInDB = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const [userId] = await db
        .insert(user)
        .values(data)
        .returning({ id: user.id });

    if (!userId) {
        throw new Error("Failed to create user");
    }

    return userId;
};

export const insertShortCodeInDB = async (
    code: string,
    link: string,
    id: number,
) => {
    const [result] = await db
        .insert(url)
        .values({
            shortCode: code,
            Link: link,
            userId: id,
        })
        .returning({ id: url.id });
    return result;
};

export const UserPassword = async (email: string) => {
    const [result] = await db
        .select({ password: user.password })
        .from(user)
        .where(eq(user.email, email));
    return result;
};

export const getAllurls = async (id: number) => {
    const data = await db
        .select({ link: url.Link, shortCode: url.shortCode })
        .from(url)
        .where(eq(url.userId, id));
    return data;
};

export const checkDBforDeletion = async (userId: number, urlId: number) => {
    const [result] = await db
        .select()
        .from(url)
        .where(eq(url.id, urlId))
        .limit(1);
    if (!result) {
        return result;
    }

    if (result.userId === userId) {
        return true;
    } else {
        return false;
    }
};

export const DeleteURL = async (urlId: number) => {
    await db.delete(url).where(eq(url.id, urlId));
    return;
};

export const checkShortCodeInDB = async (shortCode: string) => {
    const [result] = await db
        .select()
        .from(url)
        .where(eq(url.shortCode, shortCode));

    return result;
};
