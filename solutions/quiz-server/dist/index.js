"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const quiz_controller_1 = __importDefault(require("./controllers/quiz.controller"));
const quiz_service_1 = __importDefault(require("./services/quiz.service"));
const middlewares_1 = __importDefault(require("./middlewares"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use('/api', quiz_controller_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
// Events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Handle joinQuiz event
    socket.on('joinQuiz', async ({ quizId, username }) => {
        try {
            console.log(`User ${username} joining quiz ${quizId}`);
            const quiz = await quiz_service_1.default.join(quizId, username);
            console.log(`Emitting quizUpdated to room ${quizId} with participants:`, quiz.participants.length);
            io.to(quizId).emit('quizUpdated', quiz.participants);
        }
        catch (err) {
            console.error('Error in joinQuiz:', err);
        }
    });
    // score updates
    socket.on('submitAnswer', async ({ quizId, username, scoreIncrement }) => {
        try {
            const quiz = await quiz_service_1.default.updateScore(quizId, username, scoreIncrement);
            io.to(quizId).emit('quizUpdated', quiz.participants);
        }
        catch (err) {
            console.error('Error updating score:', err);
        }
    });
    // joining a room 
    socket.on('joinRoom', (quizId) => {
        socket.join(quizId);
        console.log(`User ${socket.id} joined room ${quizId}`);
    });
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(PORT, async () => {
    // Connect to MongoDB 
    await (0, middlewares_1.default)();
    console.log(`Server running on http://localhost:${PORT}`);
});
