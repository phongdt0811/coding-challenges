import { Router, Request, Response } from 'express';
import Quiz from '../repositoties/quiz.repository'

const router = Router();

// Set up routes for HTTP APIs
const getQuizzes = async (_req: Request, res: Response): Promise<any> => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
}

const createQuiz = async (req: Request, res: Response): Promise<any> => {
    try {
        const { quizId, questions }: { quizId: string; questions: string[] } = req.body;
        const newQuiz = new Quiz({ quizId, participants: [], questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
}

router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);


export default router;