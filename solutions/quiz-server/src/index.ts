import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import quizRoutes from './controllers/quiz.controller';
import QuizService from './services/quiz.service';
import connectMongo from './middlewares';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Load environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(cors({
    origin: ORIGIN, 
    methods: ['GET', 'POST'],
    credentials: true, 
}));

app.use('/api', quizRoutes);


const io = new Server(server, {
    cors: {
        origin: ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Events
io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joinQuiz event
    socket.on('joinQuiz', async ({ quizId, username }: { quizId: string; username: string }) => {
        try {
            console.log(`User ${username} joining quiz ${quizId}`);
            const quiz = await QuizService.join(quizId, username);
            console.log(`Emitting quizUpdated to room ${quizId} with participants:`, quiz.participants.length);
            io.to(quizId).emit('quizUpdated', quiz.participants);
        } catch (err) {
            console.error('Error in joinQuiz:', err);
        }
    });

    // score updates
    socket.on('submitAnswer', async ({ quizId, username, scoreIncrement }: { quizId: string; username: string; scoreIncrement: number }) => {
        try {
            const quiz = await QuizService.updateScore(quizId, username, scoreIncrement);
            io.to(quizId).emit('quizUpdated', quiz.participants);
        } catch (err) {
            console.error('Error updating score:', err);
        }
    });

    // joining a room 
    socket.on('joinRoom', (quizId: string) => {
        socket.join(quizId);
        console.log(`User ${socket.id} joined room ${quizId}`);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, async () => {
    // Connect to MongoDB 
    await connectMongo()
    console.log(`Server running on http://localhost:${PORT}`);
});
