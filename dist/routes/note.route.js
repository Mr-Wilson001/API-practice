"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware"); // Import the authentication middleware
const router = express_1.default.Router();
// Protect all note routes with the authenticate middleware
router.post("/", auth_middleware_1.authenticate, note_controller_1.default.createNote.bind(note_controller_1.default));
router.patch("/:id", auth_middleware_1.authenticate, note_controller_1.default.updateNote.bind(note_controller_1.default));
router.delete("/:id", auth_middleware_1.authenticate, note_controller_1.default.deleteNote.bind(note_controller_1.default));
router.get("/:id", auth_middleware_1.authenticate, note_controller_1.default.fetchOne.bind(note_controller_1.default));
router.get("/", auth_middleware_1.authenticate, note_controller_1.default.fetchAllNotes.bind(note_controller_1.default));
exports.default = router;
