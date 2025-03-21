import NoteModel from "../models/note.model";

class NoteService {
    async create(noteData: { name: string; content: string; description: string }) {
        return await NoteModel.create(noteData); // ✅ Ensure this method exists
    }

    async fetchOne(filter: object) {
        return await NoteModel.findOne(filter);
    }    

    async fetchAll() {
        return await NoteModel.find();
    }

    async update(noteId: string, updateData: object) {
        return await NoteModel.findByIdAndUpdate(noteId, updateData, { new: true });
    }

    async delete(noteId: string) {
        return await NoteModel.findByIdAndDelete(noteId);
    }
}

export default new NoteService();
