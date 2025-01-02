"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_repository_1 = __importDefault(require("../repositoties/quiz.repository"));
const router = (0, express_1.Router)();
// Set up routes for HTTP APIs
const getQuizzes = async (_req, res) => {
    try {
        const quizzes = await quiz_repository_1.default.find();
        res.status(200).json(quizzes);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
};
const createQuiz = async (req, res) => {
    try {
        const { quizId, questions } = req.body;
        const newQuiz = new quiz_repository_1.default({ quizId, participants: [], questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
};
router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);
exports.default = router;
