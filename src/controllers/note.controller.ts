import { Request, Response } from "express";
import NoteService from "../services/note.services";
import AuthRequest from "../types/express";
import { AuthPayload } from "../types/user";



interface AuthRequest extends Request {
  user?: AuthPayload;
}


class NoteController {
  
  async createNote(req: AuthRequest, res: Response): Promise<void>  {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        res.status(400).json({ success: false, message: "Title and content are required" });
        return;
      }
  
      // Check if a note with the same title exists for the user
      const existingNote = await NoteService.fetchOne({ title, user: req.user?.userId });
      if (existingNote) {
        res.status(409).json({ success: false, message: "A note with this title already exists" });
      }
  
      // Create the note if it doesn't exist
      const note = await NoteService.create({ title, content, user: req.user?.userId });
      res.status(201).json({ success: true, data: note, message: "Note created successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create note"});
    }
  }
  

  
  async updateNote(req: AuthRequest, res: Response): Promise<void>  {
    try {
      if (!req.user?.userId) {
        res.status(400).json({ success: false, message: "User ID is required" });
        return;
      }
      const note = await NoteService.update(req.params.id, req.body, req.user.userId);
      if (!note) {
        res.status(404).json({ success: false, message: "Note not found or unauthorized" });
      }
      res.status(200).json({ success: true, data: note, message: "Note updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update note"});
    }
  }

  async fetchOne(req: AuthRequest, res: Response): Promise<void>  {
    try {
      const note = await NoteService.fetchOne({ _id: req.params.id, user: req.user?.userId });
      if (!note) {
        res.status(404).json({ success: false, message: "Note not found" });
        return;
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch note"});
    }
  }

  async fetchAllNotes(req: AuthRequest, res: Response) {
    try {
      const notes = await NoteService.fetchAll({ user: req.user?.userId });
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch notes" });
    }
  }

  async deleteNote(req: AuthRequest, res: Response): Promise<void>  {
    try {
      const note = await NoteService.fetchOne({ _id: req.params.id, user: req.user?.userId });
      if (!note) {
        res.status(404).json({ success: false, message: "Note not found or unauthorized" });
      }
      if (!req.user?.userId) {
        res.status(400).json({ success: false, message: "User ID is required" });
        return;
      }
      await NoteService.delete(req.params.id, req.user.userId);
      res.status(200).json({ success: true, message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete note"});
    }
  }
}

export default new NoteController();
