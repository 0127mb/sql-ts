import {Request,Response,NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
export interface AuthRequest {
    user?:any
}
export function AuthMiddilware(req: Request, res: Response, next: NextFunction) {
    const authheader = req.headers.authorization;
    if (!authheader){
        return res.status(401).send("No token provided");
    }
    const token = authheader.split('')[1]
    try{
        const decoded = jwt.verify(token,process.env.secretkey || "secretkey") as JwtPayload;

        req.user = decoded;
        next()
    }catch(err){
        res.status(401).send("No token provided");
    }

}