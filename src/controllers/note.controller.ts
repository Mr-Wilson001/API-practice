import { Request, Response } from "express";
import NoteService from "../services/note.services";

class NoteController {
    async createNote(req: Request, res: Response) {
        try {
            const note = await NoteService.create(req.body);
            res.status(201).json({ success: true, data: note });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error creating note" });
        }
    }

    async fetchAllNotes(req: Request, res: Response) {
        const notes = await NoteService.fetchAll();
        res.json({ success: true, data: notes });
    }

    async fetchOne(req: Request, res: Response) {
        const note = await NoteService.fetchOne({ _id: req.params.id });
        res.json({ success: true, data: note });
      
    }
    

    async updateNote(req: Request, res: Response) {
        const note = await NoteService.update(req.params.id, req.body);
        res.json({ success: true, data: note });
    }

    async deleteNote(req: Request, res: Response) {
        await NoteService.delete(req.params.id);
        res.json({ success: true, message: "Note deleted" });
    }
}

export default new NoteController();
