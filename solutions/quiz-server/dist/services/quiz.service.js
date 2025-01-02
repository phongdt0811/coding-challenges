"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_repository_1 = __importDefault(require("../repositoties/quiz.repository"));
const join = async (quizId, username) => {
    let quiz = await quiz_repository_1.default.findOne({ quizId });
    if (!quiz) {
        quiz = new quiz_repository_1.default({ quizId, participants: [] });
    }
    const isAlreadyJoin = quiz.participants.some((p) => p.username.toLowerCase() === username.toLowerCase());
    if (!isAlreadyJoin) {
        console.log('Adding participant:', username);
        // quiz.participants.push({ username });
        await quiz.save();
    }
    else {
        console.log('Participant already exists:', username);
    }
    return quiz;
};
const updateScore = async (quizId, username, scoreIncrement) => {
    const quiz = await quiz_repository_1.default.findOneAndUpdate({ quizId, 'participants.username': username }, { $inc: { 'participants.$.score': scoreIncrement } }, { new: true });
    return quiz;
};
exports.default = {
    join,
    updateScore
};
