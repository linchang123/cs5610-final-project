export default interface quizProps {
    _id: string,
    title: string;
    quizURL: string;
    points: number;
    availableFromDate: string;
    availableTilDate: string;
    dueDate: string;
    description: string;
    numQuestions: number;
    quizType: string;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attempts: number;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQAtATime: boolean;
    webcamRequired: boolean;
    lockQAfterAnswer: boolean;
    published: boolean;
    newQuiz: boolean;
    course: string;
};