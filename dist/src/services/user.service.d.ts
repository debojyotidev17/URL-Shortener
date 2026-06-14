export declare const checkUserExistsByEmail: (email: string) => Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
} | undefined>;
export declare const insertUserInDB: (data: {
    name: string;
    email: string;
    password: string;
}) => Promise<{
    id: number;
} | undefined>;
export declare const UserPassword: (email: string) => Promise<{
    password: string;
} | undefined>;
//# sourceMappingURL=user.service.d.ts.map