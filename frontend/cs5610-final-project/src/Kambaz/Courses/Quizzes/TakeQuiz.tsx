// TakeQuiz.tsx - Component for students to take quizzes and view results
import { useParams, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Form, Button, Spinner } from "react-bootstrap";

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);

    // Redirect if not a student
    if (currentUser.role !== "STUDENT") {
        return <Navigate to="/unauthorized" />;
    }

    const quiz = quizzes.find((q: any) => q._id === qid);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // State for quiz tracking
    const key = `student-${currentUser._id}-quiz-${qid}`;
    const [answers, setAnswers] = useState<{ [id: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(quiz?.attempts || 2);
    const [score, setScore] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<{ [id: string]: any }>({});
    const [attemptTimestamps, setAttemptTimestamps] = useState<string[]>([]);

    // Load quiz questions from Redux store or directly from backend
    useEffect(() => {
        const loadQuestions = async () => {
            if (questions.length > 0) {
                const filtered = questions.filter((q: any) => q.course === cid && q.quiz === qid);
                setQuizQuestions(filtered);
            } else {
                try {
                    const response = await fetch(`http://localhost:3000/api/quizzes/${qid}/preview`);
                    const data = await response.json();
                    if (data.questions) {
                        setQuizQuestions(data.questions);
                    }
                } catch (error) {
                    console.error("Error loading quiz questions", error);
                }
            }
        };
        loadQuestions();
    }, [questions, cid, qid]);

    // Load previous quiz progress from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            const record = JSON.parse(stored);
            setAttemptsLeft(record.attemptsLeft);
            if (record.submitted) {
                setAnswers(record.answers);
                setSubmitted(true);
                setScore(record.score);
                if (record.feedback) {
                    setFeedback(record.feedback);
                }
                if (record.attemptTimestamps && Array.isArray(record.attemptTimestamps)) {
                    setAttemptTimestamps(record.attemptTimestamps);
                }
            }
        }
    }, [key]);

    // Update student's answer for a question
    const handleAnswer = (qid: string, value: string) => {
        setAnswers({ ...answers, [qid]: value });
    };

    // Submit quiz answers to backend for validation
    const handleSubmit = async () => {
        try {
            setLoading(true);

            // API call to validate answers
            const response = await fetch('http://localhost:3000/api/quiz-results/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quizId: qid,
                    userId: currentUser._id,
                    answers
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to validate answers');
            }

            const result = await response.json();
            
            // Record submission timestamp
            const currentTime = new Date().toLocaleString();
            const updatedTimestamps = [...attemptTimestamps, currentTime];
            setAttemptTimestamps(updatedTimestamps);

            // Update UI state with quiz results
            setScore(result.score);
            setFeedback(result.feedback || {});
            setSubmitted(true);

            // Decrement remaining attempts
            const newAttempts = Math.max(attemptsLeft - 1, 0);
            setAttemptsLeft(newAttempts);

            // Save progress to localStorage
            localStorage.setItem(key, JSON.stringify({
                answers,
                score: result.score,
                attemptsLeft: newAttempts,
                submitted: true,
                feedback: result.feedback,
                attemptTimestamps: updatedTimestamps
            }));
        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('Failed to submit quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Reset state for a new quiz attempt
    const handleTryAgain = () => {
        setSubmitted(false);
        setAnswers({});
        setFeedback({});
        setScore(null);
        // Preserve attempt timestamps for history

        // Update localStorage for new attempt
        localStorage.setItem(key, JSON.stringify({
            answers: {},
            submitted: false,
            attemptsLeft: attemptsLeft,
            attemptTimestamps: attemptTimestamps
        }));
    };

    // Block access if no attempts remain
    if (attemptsLeft <= 0 && !submitted) {
        return <h3 className="text-danger text-center mt-4">You have used all attempts for this quiz.</h3>;
    }

    // Utility function to get human-readable answer text
    const getDisplayAnswer = (questionId: string, answerId: string) => {
        const question = quizQuestions.find(q => q._id === questionId);
        if (!question) return answerId;

        // Handle different question types
        if (question.questionType === "multiple-choice") {
            const choice = question.choices?.find((c: any) => c.id === answerId);
            return choice?.text || answerId;
        }

        if (question.questionType === "true-false") {
            return answerId; // "True" or "False"
        }

        // Default for other question types
        return answerId;
    };

    return (
        <div className="container mt-4">
            <h2>Take Quiz</h2>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-muted">Attempts left: {attemptsLeft}</p>
                {attemptTimestamps.length > 0 && (
                    <p className="text-muted">Last attempt: {attemptTimestamps[attemptTimestamps.length - 1]}</p>
                )}
            </div>
            
            {/* Attempt history - only shown if student has attempts remaining */}
            {attemptTimestamps.length > 0 && attemptsLeft > 0 && (
                <div className="mb-4 p-3 border rounded bg-light">
                    <h5>Attempt History</h5>
                    <ul className="list-group">
                        {attemptTimestamps.map((timestamp, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Attempt {index + 1}</span>
                                <span className="text-muted">{timestamp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Quiz questions */}
            {quizQuestions.map((q: any, index: number) => (
                <div key={q._id} className="mb-4 p-3 border">
                    <h5>
                        Question {index + 1}: {q.title} ({q.points} pts)
                    </h5>

                    {q.questionText && (
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(q.questionText || "") }} />
                    )}

                    {/* Multiple choice question */}
                    {q.questionType === "multiple-choice" && (
                        <Form>
                            {q.choices?.map((a: any) => (
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

                    {/* True/False question */}
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

                    {/* Fill-in-the-blank question */}
                    {q.questionType === "fill-in-blank" && (
                        <Form.Control
                            type="text"
                            value={answers[q._id] || ""}
                            onChange={(e) => handleAnswer(q._id, e.target.value)}
                            disabled={submitted}
                        />
                    )}

                    {/* Answer feedback */}
                    {submitted && feedback[q._id] && (
                        <div className="mt-2">
                            {feedback[q._id].isCorrect ? (
                                <span className="text-success">
                                    ✔ Correct (Your answer: {
                                        feedback[q._id].displayAnswer ||
                                        getDisplayAnswer(q._id, answers[q._id]) ||
                                        answers[q._id]
                                    })
                                </span>
                            ) : (
                                <span className="text-danger">
                                    ❌ Incorrect (Your answer: {
                                        feedback[q._id].displayAnswer ||
                                        getDisplayAnswer(q._id, answers[q._id]) ||
                                        answers[q._id]
                                    })
                                    {feedback[q._id].correctAnswer && (
                                        <span className="ms-2">Correct answer: {feedback[q._id].correctAnswer}</span>
                                    )}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {/* Quiz submission button */}
            {!submitted && (
                <div className="text-end">
                    <Button
                        variant="success"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span className="ms-2">Submitting...</span>
                            </>
                        ) : (
                            'Submit Quiz'
                        )}
                    </Button>
                </div>
            )}

            {/* Quiz results and retry button */}
            {submitted && score !== null && (
                <div className="mt-4">
                    <h4 className="text-success">Your score: {score} points</h4>

                    {attemptsLeft > 0 && (
                        <Button
                            variant="primary"
                            onClick={handleTryAgain}
                            className="mt-3"
                        >
                            Try Again ({attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} left)
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}