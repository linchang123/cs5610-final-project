import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function PreviewQuiz() {
    const { qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [answers, setAnswers] = useState<{ [id: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    if (!currentUser || currentUser.role !== "FACULTY") {
        return <Navigate to="/unauthorized" />;
    }

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/quizzes/${qid}/preview`);
                const data = await response.json();
                if (data.questions) {
                    setQuizQuestions(data.questions);
                }
            } catch (error) {
                console.error("Error loading preview questions", error);
            }
        };
        loadQuestions();
    }, [qid]);

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        localStorage.setItem(`preview-${currentUser._id}-${qid}`, JSON.stringify(answers));
    };

    // Helper function to get human-readable answer text
    const getDisplayAnswer = (questionId: string, answerId: string) => {
        const question = quizQuestions.find(q => q._id === questionId);
        if (!question) return answerId;

        // For multiple choice, return the text of the selected option
        if (question.questionType === "multiple-choice") {
            const choice = question.choices?.find((c: any) => c.id === answerId);
            return choice?.text || answerId;
        }

        // For true-false, it's already human-readable
        if (question.questionType === "true-false") {
            return answerId; // Already "True" or "False"
        }

        // For fill-in-blank or other types, return as is
        return answerId;
    };

    const calculateScore = () => {
        let score = 0;
        for (let q of quizQuestions) {
            const studentAnswer = answers[q._id];

            // Skip if no answer provided
            if (!studentAnswer) continue;

            // Handle multiple-choice questions
            if (q.questionType === "multiple-choice") {
                // Find selected choice and check if it's correct
                const selectedChoice = q.choices?.find((c: any) => c.id === studentAnswer);
                if (selectedChoice?.isCorrect) {
                    score += q.points;
                }
            }
            // Handle true-false questions
            else if (q.questionType === "true-false") {
                // Convert to consistent format for comparison
                const normalizedStudentAnswer = studentAnswer.toLowerCase();
                let correctAnswer;

                // Extract correct answer based on format
                if (q.correctAnswer) {
                    if (typeof q.correctAnswer === 'boolean') {
                        correctAnswer = q.correctAnswer ? 'true' : 'false';
                    } else if (typeof q.correctAnswer === 'string') {
                        correctAnswer = q.correctAnswer.toLowerCase();
                    } else if (typeof q.correctAnswer === 'object' && q.correctAnswer !== null) {
                        // Handle object with value property
                        if (typeof q.correctAnswer.value === 'boolean') {
                            correctAnswer = q.correctAnswer.value ? 'true' : 'false';
                        } else if (typeof q.correctAnswer.value === 'string') {
                            correctAnswer = q.correctAnswer.value.toLowerCase();
                        }
                    }
                }

                if (normalizedStudentAnswer === correctAnswer) {
                    score += q.points;
                }
            }
            // Handle fill-in-blank questions
            else if (q.questionType === "fill-in-blank") {
                // Collect all possible correct answers
                let possibleAnswers: string[] = [];

                // From answers array
                if (q.answers && Array.isArray(q.answers)) {
                    possibleAnswers = [
                        ...possibleAnswers,
                        ...q.answers.map((a: any) => typeof a === 'object' && a.value ? a.value : String(a))
                    ];
                }

                // From possibleAnswers array
                if (q.possibleAnswers && Array.isArray(q.possibleAnswers)) {
                    possibleAnswers = [
                        ...possibleAnswers,
                        ...q.possibleAnswers.map((a: any) => typeof a === 'object' && a.value ? a.value : String(a))
                    ];
                }

                // From correctAnswers array
                if (q.correctAnswers && Array.isArray(q.correctAnswers)) {
                    possibleAnswers = [...possibleAnswers, ...q.correctAnswers.map(String)];
                }

                // From correctAnswer field
                if (q.correctAnswer) {
                    if (Array.isArray(q.correctAnswer)) {
                        possibleAnswers = [...possibleAnswers, ...q.correctAnswer.map(String)];
                    } else if (typeof q.correctAnswer === 'object' && q.correctAnswer?.value) {
                        possibleAnswers.push(String(q.correctAnswer.value));
                    } else {
                        possibleAnswers.push(String(q.correctAnswer));
                    }
                }

                // From acceptedAnswers field (legacy/backward compatibility)
                if (q.acceptedAnswers && Array.isArray(q.acceptedAnswers)) {
                    possibleAnswers = [...possibleAnswers, ...q.acceptedAnswers.map(String)];
                }

                // Check if student answer matches any possible answer
                if (possibleAnswers.some(ans =>
                    studentAnswer.toLowerCase().trim() === ans.toLowerCase().trim()
                )) {
                    score += q.points;
                }
            }
            // Fallback to simple acceptedAnswers check for other question types
            else if (Array.isArray(q.acceptedAnswers)) {
                if (q.acceptedAnswers.includes(studentAnswer)) {
                    score += q.points;
                }
            }
        }
        return score;
    };

    // Function to check if an answer is correct
    const isAnswerCorrect = (question: any, answer: string) => {
        if (!answer) return false;

        // For multiple-choice questions
        if (question.questionType === "multiple-choice") {
            const selectedChoice = question.choices?.find((c: any) => c.id === answer);
            return selectedChoice?.isCorrect === true;
        }

        // For true-false questions
        if (question.questionType === "true-false") {
            const normalizedAnswer = answer.toLowerCase();
            let correctAnswer;

            // Extract correct answer based on format
            if (question.correctAnswer) {
                if (typeof question.correctAnswer === 'boolean') {
                    correctAnswer = question.correctAnswer ? 'true' : 'false';
                } else if (typeof question.correctAnswer === 'string') {
                    correctAnswer = question.correctAnswer.toLowerCase();
                } else if (typeof question.correctAnswer === 'object' && question.correctAnswer !== null) {
                    if (typeof question.correctAnswer.value === 'boolean') {
                        correctAnswer = question.correctAnswer.value ? 'true' : 'false';
                    } else if (typeof question.correctAnswer.value === 'string') {
                        correctAnswer = question.correctAnswer.value.toLowerCase();
                    }
                }
            }

            return normalizedAnswer === correctAnswer;
        }

        // For fill-in-blank questions
        if (question.questionType === "fill-in-blank") {
            let possibleAnswers: string[] = [];

            // From answers array
            if (question.answers && Array.isArray(question.answers)) {
                possibleAnswers = [
                    ...possibleAnswers,
                    ...question.answers.map((a: any) => typeof a === 'object' && a.value ? a.value : String(a))
                ];
            }

            // From possibleAnswers array
            if (question.possibleAnswers && Array.isArray(question.possibleAnswers)) {
                possibleAnswers = [
                    ...possibleAnswers,
                    ...question.possibleAnswers.map((a: any) => typeof a === 'object' && a.value ? a.value : String(a))
                ];
            }

            // From correctAnswers array
            if (question.correctAnswers && Array.isArray(question.correctAnswers)) {
                possibleAnswers = [...possibleAnswers, ...question.correctAnswers.map(String)];
            }

            // From correctAnswer field
            if (question.correctAnswer) {
                if (Array.isArray(question.correctAnswer)) {
                    possibleAnswers = [...possibleAnswers, ...question.correctAnswer.map(String)];
                } else if (typeof question.correctAnswer === 'object' && question.correctAnswer?.value) {
                    possibleAnswers.push(String(question.correctAnswer.value));
                } else {
                    possibleAnswers.push(String(question.correctAnswer));
                }
            }

            // From acceptedAnswers field (legacy/backward compatibility)
            if (question.acceptedAnswers && Array.isArray(question.acceptedAnswers)) {
                possibleAnswers = [...possibleAnswers, ...question.acceptedAnswers.map(String)];
            }

            // Special handling for equations
            if (answer.includes('+') || answer.includes('*') || answer.includes('-') ||
                answer.includes('(') || answer.includes(')')) {

                // For math expressions like equations
                const normalizeMathExpr = (expr: string) => {
                    return expr.toString()
                        .toLowerCase()
                        .replace(/\s+/g, '')       // Remove whitespace
                        .replace(/m(dot|̇)/g, 'mdot') // Normalize mdot
                        .replace(/ṁ/g, 'mdot')      // Unicode mdot
                        .replace(/[×⋅]/g, '*')      // Normalize multiplication
                        .replace(/p_?2/g, 'p2')     // Normalize p2
                        .replace(/p_?1/g, 'p1')     // Normalize p1
                        .replace(/\*/g, '')         // Remove * for consistency
                        .replace(/\//g, '')         // Remove / for consistency
                        .replace(/\(/g, '')         // Remove parentheses for consistency
                        .replace(/\)/g, '');        // Remove parentheses for consistency
                };

                const normalizedStudentAnswer = normalizeMathExpr(answer);

                return possibleAnswers.some(ans => {
                    const normalizedCorrectAnswer = normalizeMathExpr(String(ans));

                    // Direct comparison after normalization
                    if (normalizedStudentAnswer === normalizedCorrectAnswer) {
                        return true;
                    }

                    // Term-by-term comparison for expressions with +
                    if (normalizedStudentAnswer.includes('+') && normalizedCorrectAnswer.includes('+')) {
                        const studentTerms = normalizedStudentAnswer.split('+').map(t => t.trim()).sort();
                        const answerTerms = normalizedCorrectAnswer.split('+').map(t => t.trim()).sort();

                        if (studentTerms.length === answerTerms.length) {
                            return studentTerms.every((term, i) => term === answerTerms[i]);
                        }
                    }

                    return false;
                });
            }

            // Standard string comparison for non-math expressions
            return possibleAnswers.some(ans =>
                answer.toLowerCase().trim() === String(ans).toLowerCase().trim()
            );
        }

        // Fallback to acceptedAnswers for other question types
        if (Array.isArray(question.acceptedAnswers)) {
            return question.acceptedAnswers.includes(answer);
        }

        return false;
    };

    return (
        <div className="container mt-4">
            <h2>Preview Quiz</h2>

            {quizQuestions.map((q: any, index: number) => (
                <div key={q._id} className="mb-4 p-3 border">
                    <h5>
                        Question {index + 1}: {q.title} ({q.points} pts)
                    </h5>

                    {/* Show real question text (NOT prompt anymore) */}
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(q.questionText || "") }} />

                    {/* Multiple Choice */}
                    {q.questionType === "multiple-choice" && q.choices && (
                        <Form>
                            {q.choices.map((a: any) => (
                                <Form.Check
                                    key={a.id}
                                    type="radio"
                                    label={a.text}
                                    name={`q-${q._id}`}
                                    value={a.id}
                                    checked={answers[q._id] === a.id}
                                    onChange={() => handleAnswer(q._id, a.id)}
                                    disabled={submitted}
                                />
                            ))}
                        </Form>
                    )}

                    {/* True/False */}
                    {q.questionType === "true-false" && (
                        <Form>
                            {["True", "False"].map((val) => (
                                <Form.Check
                                    key={val}
                                    type="radio"
                                    label={val}
                                    name={`q-${q._id}`}
                                    value={val}
                                    checked={answers[q._id] === val}
                                    onChange={() => handleAnswer(q._id, val)}
                                    disabled={submitted}
                                />
                            ))}
                        </Form>
                    )}

                    {/* Fill in the Blank */}
                    {q.questionType === "fill-in-blank" && (
                        <Form.Control
                            type="text"
                            value={answers[q._id] || ""}
                            onChange={(e) => handleAnswer(q._id, e.target.value)}
                            disabled={submitted}
                        />
                    )}

                    {/* Show feedback after submit with human-readable answers */}
                    {submitted && (
                        <div className="mt-2">
                            {isAnswerCorrect(q, answers[q._id]) ? (
                                <span className="text-success">✔ Correct (Your answer: {getDisplayAnswer(q._id, answers[q._id])})</span>
                            ) : (
                                <span className="text-danger">❌ Incorrect (Your answer: {getDisplayAnswer(q._id, answers[q._id])})</span>
                            )}
                        </div>
                    )}
                </div>
            ))}

            <div className="text-end">
                {!submitted && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit Quiz
                    </Button>
                )}
                {submitted && (
                    <h4 className="mt-4">Score: {calculateScore()} points</h4>
                )}
            </div>
        </div>
    );
}