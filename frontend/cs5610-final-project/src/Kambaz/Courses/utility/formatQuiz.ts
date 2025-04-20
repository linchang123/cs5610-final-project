export const formatQuiz = (quizData: any) => {
    const {newQuiz, quizURL, points, numQuestions, ...quiz} = quizData;
    return ({
        ...quiz,
        availableDate: quiz.availableFromDate,
        untilDate: quiz.availableTilDate,
        courseId: quiz.course,
        howManyAttempts: quiz.attempts,
        oneQuestionAtATime: quiz.oneQAtATime,
        lockQuestionsAfterAnswering: quiz.lockQAfterAnswer,
        assignmentGroup: capitalizeFirstLetter(quiz.assignmentGroup)
    });
}

export function capitalizeFirstLetter(word: string): string {
    if (!word) return word;
    const lowerCaseWord = word.toLowerCase();
    return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
  }