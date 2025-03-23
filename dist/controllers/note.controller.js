"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const note_services_1 = __importDefault(require("../services/note.services"));
class NoteController {
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { title, content } = req.body;
                if (!title || !content) {
                    res.status(400).json({ success: false, message: "Title and content are required" });
                    return;
                }
                // Check if a note with the same title exists for the user
                const existingNote = yield note_services_1.default.fetchOne({ title, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
                if (existingNote) {
                    res.status(409).json({ success: false, message: "A note with this title already exists" });
                }
                // Create the note if it doesn't exist
                const note = yield note_services_1.default.create({ title, content, user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId });
                res.status(201).json({ success: true, data: note, message: "Note created successfully" });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to create note" });
            }
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
                    res.status(400).json({ success: false, message: "User ID is required" });
                    return;
                }
                const note = yield note_services_1.default.update(req.params.id, req.body, req.user.userId);
                if (!note) {
                    res.status(404).json({ success: false, message: "Note not found or unauthorized" });
                }
                res.status(200).json({ success: true, data: note, message: "Note updated successfully" });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to update note" });
            }
        });
    }
    fetchOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const note = yield note_services_1.default.fetchOne({ _id: req.params.id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
                if (!note) {
                    res.status(404).json({ success: false, message: "Note not found" });
                    return;
                }
                res.status(200).json({ success: true, data: note });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to fetch note" });
            }
        });
    }
    fetchAllNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const notes = yield note_services_1.default.fetchAll({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
                res.status(200).json({ success: true, data: notes });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to fetch notes" });
            }
        });
    }
    deleteNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const note = yield note_services_1.default.fetchOne({ _id: req.params.id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
                if (!note) {
                    res.status(404).json({ success: false, message: "Note not found or unauthorized" });
                }
                if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId)) {
                    res.status(400).json({ success: false, message: "User ID is required" });
                    return;
                }
                yield note_services_1.default.delete(req.params.id, req.user.userId);
                res.status(200).json({ success: true, message: "Note deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Failed to delete note" });
            }
        });
    }
}
exports.default = new NoteController();
