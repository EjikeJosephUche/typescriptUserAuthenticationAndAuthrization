import express from 'express';
import connectDB from './config/db';
import NoteController from './controllers/noteController';
import logRequest from './middlewares/loggingMiddleware';
import noteRouter from './routes/note.route';
import authRouter from './routes/auth.route';
import authMiddleware from './middlewares/authMiddleware';

const app = express();


// To use json globally
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// To use the logging middleware globally
app.use(logRequest)
app.use('/api/notes', authMiddleware);

connectDB();

// To route to the express router
app.use(noteRouter)
app.use(authRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`✅ Server is up and running on port ${PORT}`)
});
