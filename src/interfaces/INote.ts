// The interface for the note
import { Document } from "mongoose";
import {IUser} from "./IUser";
// import ICategory from './ICategory'


export default interface INote extends Document{
    userId: string,
    title: String,
    content: String,
    createdAt: Date;
    updatedAt: Date;
    category: string;
    
};
