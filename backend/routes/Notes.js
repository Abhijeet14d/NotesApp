import express from 'express';
import { createNotes, UpdateNotes } from '../controllers/Notes.js';
import { TokenVerification } from '../middlewares/TokenVerification.js';

const notesRouter = express.Router();

notesRouter.get('/createNotes', TokenVerification, createNotes);
notesRouter.put('/updateNotes/:id', UpdateNotes);

export default notesRouter;