interface QuizParticipant {
    username: string;
    score: number;
}

interface QuizDocument {
    quizId: string;
    participants: QuizParticipant[];
    questions: string[];
}