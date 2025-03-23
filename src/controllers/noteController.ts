import { NoteService } from "../services/NoteService";
import { Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
           userId?: string;
        }
    }
}

export default class NoteController {
    private noteService: NoteService;

    constructor (){
        this.noteService = new NoteService();
    }
    async getNoteById(req: Request, res: Response){
        try{
            const userId = req.userId;
            if (!userId){
                return res.status(401).json({message: 'User not Authenticated'});
            }
            const getNote = await this.noteService.getNoteById(req.params.id, userId);
            if(!getNote){
                res.status(404).json("Request was not found");
            } else {
                res.json(getNote);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getNotes(req: Request, res: Response){
        try{
            const userId = req.userId;
            
            if (!userId){
                return res.status(401).json({message: 'User not Authenticated'});
            }
            const notes = await this.noteService.getNotes(userId);

            res.json(notes);
        } catch(error){
            res.status(500).json( {error});
        }
    }

    async createNote(req: Request, res: Response){
        try{
            const note = await this.noteService.createNote(req.body, req.userId as string);
            res.status(201).json({
                message: "Note created successfully!",
                data: note
            })
        } catch (error){
            res.status(500).json(error)
        }

    }

    
    async deleteNote(req: Request, res: Response){
        try {
            const userId = req.userId;
            if (!userId){
                return res.status(401).json({message: 'User not Authenticated'});
            }
            const deleteNote = await this.noteService.deleteNote(req.params.id, userId);
            if (!deleteNote){
                res.status(404).json("File does not exist");
            } else {
                res.status(204).json({message: "file deleted successfully"});
                
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    async getNotesByCategoryId(req: Request, res: Response){
        
        try{
            const userId = req.userId;
            if (!userId){
                return res.status(401).json({message: 'User not Authenticated'});
            }

            const { categoryId } = req.params;
            
            const note = await this.noteService.getNotesByCategoryId(categoryId, userId);
            if(!note){
                res.status(404).json("File does not exist");
            } else {
                res.json(note)
            }
        } catch (error){
            res.status(500).json(error);
        }
    }
    

    async updateNote(req: Request, res: Response){
        try{
            const userId = req.userId;
            if (!userId){
                return res.status(401).json({message: 'User not Authenticated'});
            }
            const updateNote = await this.noteService.updateNote(req.params.id, userId, req.body);
            if (!updateNote){
                res.status(404).json("File not found");
            } else {
                res.json({message: "Note updated successfully",
                    data: updateNote});
            }
        } catch (error){
            res.status(500).json(error)
        }
    }
    
}
