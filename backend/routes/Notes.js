import express from 'express';
import { createNotes, UpdateNotes, deleteNotes, getNotes } from '../controllers/Notes.js';
import { TokenVerification } from '../middlewares/TokenVerification.js';

const notesRouter = express.Router();

notesRouter.post('/createNotes', TokenVerification, createNotes);
notesRouter.put('/updateNotes/:id', TokenVerification, UpdateNotes);
notesRouter.delete('/deleteNotes/:id', TokenVerification, deleteNotes);
notesRouter.get('/getNotes',TokenVerification, getNotes);

export default notesRouter;