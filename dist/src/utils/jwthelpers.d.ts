export interface JwtPayload {
    userId: number;
    email: string;
}
export declare const generateAccessToken: (payload: JwtPayload) => string;
export declare const generateRefreshToken: (payload: JwtPayload) => string;
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
//# sourceMappingURL=jwthelpers.d.ts.map