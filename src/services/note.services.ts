import NoteModel from "../models/note.model";

class NoteService {
  static async fetchAll(query: object) {
    return await NoteModel.find(query);
  }

  static async fetchOne(query: object) {
    return await NoteModel.findOne(query);
  }

  static async create(data: object) {
    return await NoteModel.create(data);
  }

  static async update(id: string, data: object, userId: string) {
    return await NoteModel.findByIdAndUpdate({ _id: id, user: userId }, data, { new: true });
  }

  static async delete(id: string, userId: string) {
    return await NoteModel.findByIdAndDelete({ _id: id, user: userId });
  }
}

export default NoteService;
