"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUIZ_COLLECTION_NAME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const participant_repository_1 = require("./participant.repository");
const question_repository_1 = require("./question.repository");
exports.QUIZ_COLLECTION_NAME = 'quizs';
const QuizSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    participants: [participant_repository_1.ParticipantSchema],
    questions: [question_repository_1.QuestionSchema]
});
exports.default = mongoose_1.default.model(exports.QUIZ_COLLECTION_NAME, QuizSchema);
