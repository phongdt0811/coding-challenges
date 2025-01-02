import mongoose from 'mongoose'
import { ParticipantSchema } from './participant.repository';
import { QuestionSchema } from './question.repository';

export const QUIZ_COLLECTION_NAME = 'quizs'

const QuizSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    participants: [ParticipantSchema],
    questions: [QuestionSchema]
});

export default mongoose.model(QUIZ_COLLECTION_NAME, QuizSchema);