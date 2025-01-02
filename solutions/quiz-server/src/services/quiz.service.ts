import Quiz from '../repositoties/quiz.repository'

const join = async (quizId: string, username: string) => {
    let quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
        quiz = new Quiz({ quizId, participants: [] });
    }

    const isAlreadyJoin = quiz.participants.some(
        (p:any) => p.username.toLowerCase() === username.toLowerCase()
    );

    if (!isAlreadyJoin) {
        console.log('Adding participant:', username);
        // quiz.participants.push({ username });
        await quiz.save();
    } else {
        console.log('Participant already exists:', username);
    }

    return quiz;
};

const updateScore = async (quizId: string, username: string, scoreIncrement: number): Promise<any> => {
    const quiz = await Quiz.findOneAndUpdate(
        { quizId, 'participants.username': username },
        { $inc: { 'participants.$.score': scoreIncrement } },
        { new: true }
    );

    return quiz;
};

export default {
    join,
    updateScore
}