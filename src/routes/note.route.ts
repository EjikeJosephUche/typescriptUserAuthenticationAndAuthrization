import express, {Request, Response} from 'express';
import logRequest from '../middlewares/loggingMiddleware';
import validateNote from '../middlewares/validateNote.middlewares';
import NoteController from '../controllers/noteController';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();

const noteController = new NoteController();

router.get("/", (req:Request, res:Response) => {
    res.send("The Server is working Correctly");
});
router.post("/api/notes", authMiddleware, validateNote, logRequest, (req: Request, res: Response) =>{
    noteController.createNote(req, res);
});

router.put("/api/notes/:id", logRequest, (req: Request, res: Response) => {
    noteController.updateNote(req, res);
})

router.get("/api/notes", authMiddleware, (req: Request, res: Response) =>{
    noteController.getNotes(req, res);
});
router.get("/api/notes/:id", authMiddleware, (req: Request, res: Response) =>{
    noteController.getNoteById(req, res);
});

router.delete("/api/notes/:id", authMiddleware, (req: Request, res: Response) =>{
    noteController.deleteNote(req, res);
});

router.get("/api/notes/categories/:categoryId", authMiddleware, (req: Request, res: Response) =>{
    noteController.getNotesByCategoryId(req, res);
});


export default router;