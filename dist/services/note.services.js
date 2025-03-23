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
const note_model_1 = __importDefault(require("../models/note.model"));
class NoteService {
    static fetchAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.default.find(query);
        });
    }
    static fetchOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.default.findOne(query);
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.default.create(data);
        });
    }
    static update(id, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.default.findByIdAndUpdate({ _id: id, user: userId }, data, { new: true });
        });
    }
    static delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield note_model_1.default.findByIdAndDelete({ _id: id, user: userId });
        });
    }
}
exports.default = NoteService;
