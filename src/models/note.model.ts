import { Schema, model } from "mongoose";

const NoteSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const NoteModel = model("Note", NoteSchema);
export default NoteModel;
