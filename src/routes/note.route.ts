import express from "express";
import NoteController from "../controllers/note.controller";
import { authenticate } from "../middlewares/auth.middleware"; // Import the authentication middleware

const router = express.Router();

// Protect all note routes with the authenticate middleware
router.post("/", authenticate, NoteController.createNote.bind(NoteController));
router.patch("/:id", authenticate, NoteController.updateNote.bind(NoteController));
router.delete("/:id", authenticate, NoteController.deleteNote.bind(NoteController));
router.get("/:id", authenticate, NoteController.fetchOne.bind(NoteController));
router.get("/", authenticate, NoteController.fetchAllNotes.bind(NoteController));

export default router;