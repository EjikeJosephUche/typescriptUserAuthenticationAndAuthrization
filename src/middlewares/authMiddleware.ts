import Jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {AuthPayload} from "../interfaces/IUser";
import { JWT_SECRET } from "../constants/env";


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.url === '/api/auth/register' || req.url === '/'){
        return next()
    }
    
    try {
            const token = req.header('Authorization')?.replace('Bearer', '').trim();
            console.log("Received token: ", token)
            if (!token) {
                console.log('Access denied, Token is missing')
                res.status(401).json({
                    message: 'Unauthorized Access'
                })
                return;
            }
        const decoded = Jwt.verify(token as string, JWT_SECRET) as AuthPayload;
        console.log('Decoded token: ', decoded); 
        req.userId = (decoded as { userId: string }).userId;

        console.log('User ID: ', req.userId)
        
        next();
    } catch (error){
        console.log('JWT verification failed')
        res.status(401).json({
            message: 'invalid token'
        });
    }
}

export default authMiddleware;