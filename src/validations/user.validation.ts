import { xid, z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
});

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export const JwtUserSchema = z.object({
    userId: z.number(),
    email: z.email(),
});

export const linkCreationSchema = z.object({
    shortCode: z.string(),
    Link: z.url(),
});
