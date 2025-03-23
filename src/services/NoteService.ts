import INote from "../interfaces/INote";
import { NoteModel } from "../models/NoteModel";

export class NoteService {
    async getNoteById(id: string, userId: string): Promise<INote | null>{
        
        const note = await NoteModel.findById(id);
        if (note && note.userId.toString() === userId){
            return note.toObject();
        } else {
            return null;
        }
    }

    async getNotes(userId: string): Promise<INote[] | null>{
        const notes = await NoteModel.find({userId});
        
            return notes.map(note => note.toObject());
    }

    async createNote(noteData:{title: String, content: String, category: String}, userId: String): Promise<INote>{
        const savedNote = await NoteModel.create({...noteData, userId});
        return savedNote;
    }

    
    async deleteNote(id: string, userId: string): Promise<void | null>{
        const note = await NoteModel.findById(id);
        if (note && note.userId.toString() === userId){
            return await NoteModel.findByIdAndDelete(id);
        } else {
            return null;
        }

    }
    
    async getNotesByCategoryId( category: string, userId: string): Promise<INote[] | null>{
        const notes = await NoteModel.find({userId, category: category.toLowerCase()});
        if (notes.length > 0){
            return notes.map(note => note.toObject());
        } else {
            return null;
        }
        
    }
    
    async updateNote(
        id: string,
        userId: string,
        noteData: { title?: string, content?: string, category?: string, userId: string } 
    ): Promise<INote | null>{
        const note = await NoteModel.findById(id);
        if (note && note.userId.toString() === userId) {
            if (noteData.category){
                noteData.category = noteData.category.toLowerCase()
            } 
            const updatedNote = NoteModel.findByIdAndUpdate(id, noteData, {new: true});
            return updatedNote;
        } else {
            return null;
        }
        
        
    }
} 