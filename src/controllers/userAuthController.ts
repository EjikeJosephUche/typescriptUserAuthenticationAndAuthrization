// controllers/registerUserController

import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { IAuthRequest } from '../interfaces/IAuth';

class UserAuthController {
    
    async registerUser (req:Request, res:Response) {
        try{
            const userData: IAuthRequest = req.body;
            
            const user = await UserService.createUser(userData);
            console.log(user)
            return res.status(201).json({
                message: "User created Successfully",
                user,
            });
            
        } catch (error){
            return res.status(400).json({message: `${error}`})
        }
    }

    async loginUser (req: Request, res: Response){
        try{
            const userData: IAuthRequest = req.body;
            
            const token = await UserService.loginUser(userData);
            
            return res.status(200).json({
                message: 'Login successful',
                token: token,
            });
        } catch (error){
            
            return res.status(400).json({
                message: "Invalid credentials",
                error: `${error}`
            });
        }
    }
}

export default new UserAuthController();