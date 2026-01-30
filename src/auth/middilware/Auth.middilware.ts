// src/auth/middilware/Auth.middilware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../core/Config";
import { Role } from "../../core/constns/enum";

export function AuthMiddilware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;


    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).send("No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;


        req.user = decoded;
        next();
    } catch (err) {

        return res.status(401).send("Invalid token");
    }
}


export function Roles(...allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as JwtPayload | undefined;

        if (!user || !allowedRoles.includes(user.role as Role)) {

            return res.status(403).send("You are not authorized to access this route");
        }
        next();
    };
}
