"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantSchema = exports.PARTICIPANT_COLLECTION_NAME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.PARTICIPANT_COLLECTION_NAME = 'participants';
exports.ParticipantSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});
exports.default = mongoose_1.default.model(exports.PARTICIPANT_COLLECTION_NAME, exports.ParticipantSchema);
