"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const note_route_1 = __importDefault(require("./routes/note.route"));
const server_1 = __importDefault(require("./server"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/notes", note_route_1.default);
const PORT = process.env.PORT || 5001;
(0, server_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
