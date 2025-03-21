import express from "express";
import NoteController from "../controllers/note.controller"; 

const router = express.Router();

router.post("/", NoteController.createNote);
router.patch("/:id", NoteController.updateNote);
router.delete("/:id", NoteController.deleteNote);
router.get("/:id", NoteController.fetchOne);
router.get("/", NoteController.fetchAllNotes);


export default router;


