import Jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {AuthPayload} from "../interfaces/IUser";
import { JWT_SECRET } from "../constants/env";
// import dotenv from 'dotenv'
// dotenv.config();

// declare global {
//     namespace Express {
//       interface Request {
//         user?: {
//             id: string,
//             _id: string
//         }
//       }
//     }
//   }


const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (req.url === '/api/auth/register' || req.url === '/' || req.url === '/api/auth/login'){
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

        req.user = decoded;
        
        next();
    } catch (error){
        console.log('JWT verification failed', error)
        res.status(401).json({
            message: 'invalid token'
        });
    }
}

export default authMiddleware;