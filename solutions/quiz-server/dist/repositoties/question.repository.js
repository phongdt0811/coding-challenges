"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = exports.QUESTION_COLLECTION_NAME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.QUESTION_COLLECTION_NAME = 'questions';
exports.QuestionSchema = new mongoose_1.default.Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    answer: { type: String, required: true }
});
exports.default = mongoose_1.default.model(exports.QUESTION_COLLECTION_NAME, exports.QuestionSchema);
