"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_repository_1 = __importDefault(require("../repositoties/quiz.repository")); // Assuming your Quiz model is here
// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/quizdb';
mongoose_1.default.connect(mongoUrl)
    .then(async () => {
    console.log('Connected to MongoDB');
    await quiz_repository_1.default.deleteMany({});
    const quizData = [
        {
            id: 'vocabQuiz1',
            participants: [
                { username: 'Alice', score: 10 },
                { username: 'Bob', score: 8 },
                { username: 'Charlie', score: 6 }
            ],
            questions: [
                { question: 'What is the meaning of "benevolent"?', options: ['Kind', 'Cruel', 'Neutral'], answer: 'Kind' },
                { question: 'What is a synonym for "diligent"?', options: ['Lazy', 'Hardworking', 'Careless'], answer: 'Hardworking' },
                { question: 'What is the antonym of "ancient"?', options: ['Modern', 'Old', 'Antique'], answer: 'Modern' }
            ]
        },
        {
            id: 'vocabQuiz2',
            participants: [
                { username: 'David', score: 12 },
                { username: 'Eva', score: 9 }
            ],
            questions: [
                { question: 'What is the meaning of "ephemeral"?', options: ['Permanent', 'Short-lived', 'Eternal'], answer: 'Short-lived' },
                { question: 'What is a synonym for "ambiguous"?', options: ['Clear', 'Uncertain', 'Certain'], answer: 'Uncertain' },
                { question: 'What is the antonym of "vivid"?', options: ['Dull', 'Bright', 'Clear'], answer: 'Dull' }
            ]
        }
    ];
    await quiz_repository_1.default.insertMany(quizData);
    console.log('Mock data inserted');
    mongoose_1.default.disconnect();
})
    .catch((err) => {
    console.error('Error connecting to MongoDB or running migration', err);
    mongoose_1.default.disconnect();
});
