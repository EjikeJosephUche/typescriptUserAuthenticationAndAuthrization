import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {IAuthRequest} from "../interfaces/IAuth";
import {IUser} from "../interfaces/IUser";
import { UserModel } from "../models/UserModel";
import { JWT_SECRET } from '../constants/env';


class UserService {

     async createUser (userData: IAuthRequest): Promise<IUser>{
        try{
            const {username, password} = userData;

            const existingUser = await UserModel.exists({ username });
            if(!password){
                throw new Error('Password is required');
            }
            if (existingUser){
                throw new Error('Username already exist');
                
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username,
                password: hashedPassword
            });

            return await newUser.save();
        } catch (error) {

            throw new Error(`Error creating user: ${error instanceof Error? error.message : error}`);
        }
    }

    async loginUser (userData: IAuthRequest): Promise<string>{
        try{
            const {username, password} = userData;
            const user = await UserModel.findOne({username});
            if(!user){
                throw new Error("Invalid Username or password");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                throw new Error("Invalid Username or password");
            }
            
            const token = jwt.sign({ userId: user.id, username: user.username}, JWT_SECRET, {
                expiresIn: '1h',
            });
            
            return token;
        } catch (error){
            throw new Error ('Error logging in');
        }
    }
}
export default new UserService();