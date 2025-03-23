// The interface for the note
import { Document } from "mongoose";

export default interface INote extends Document{
    userId: string,
    title: String,
    content: String,
    createdAt: Date;
    updatedAt: Date;
    category: string;
    
};
