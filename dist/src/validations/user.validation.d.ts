import { z } from "zod";
export declare const registerUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginUserSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
//# sourceMappingURL=user.validation.d.ts.map