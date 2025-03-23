import mongoose, { Schema, Document, model } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  user: mongoose.Types.ObjectId;
}

const NoteSchema: Schema = new Schema({
  title: {
     type: String, 
     required: true,
     unique: true, 
    },
  content: { 
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User", required: true 
    },
});

export default mongoose.model<INote>("Note", NoteSchema);