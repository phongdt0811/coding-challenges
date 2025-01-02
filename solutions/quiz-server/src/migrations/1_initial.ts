import mongoose from 'mongoose';
import Quiz from '../repositoties/quiz.repository';  // Assuming your Quiz model is here

// Connect to MongoDB
const mongoUrl: string = 'mongodb://localhost:27017/quizdb'

mongoose.connect(mongoUrl)
    .then(async () => {
        console.log('Connected to MongoDB');

        await Quiz.deleteMany({});

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

        await Quiz.insertMany(quizData);

        console.log('Mock data inserted');
        mongoose.disconnect();  
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB or running migration', err);
        mongoose.disconnect();
    });
