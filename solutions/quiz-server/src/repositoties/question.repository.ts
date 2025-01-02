import mongoose from 'mongoose'

export const QUESTION_COLLECTION_NAME = 'questions'

export const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }], 
    answer: { type: String, required: true }
})

export default mongoose.model(QUESTION_COLLECTION_NAME, QuestionSchema);
