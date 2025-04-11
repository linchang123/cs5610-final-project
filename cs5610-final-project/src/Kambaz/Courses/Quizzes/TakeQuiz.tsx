// src/components/Quizzes/TakeQuiz.tsx
import { useParams, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { Form, Button } from "react-bootstrap";

export default function TakeQuiz() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    if (currentUser.role !== "STUDENT") {
        return <Navigate to="/unauthorized" />;
    }

    const quiz = quizzes.find((q: any) => q._id === qid);
    const quizQuestions = questions.filter((q: any) => q.course === cid && q.quiz === qid);

    const key = `student-${currentUser._id}-quiz-${qid}`;
    const [answers, setAnswers] = useState<{ [id: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(quiz?.attempts || 1);
    const [score, setScore] = useState<number | null>(null);

    // 初始化已有答题记录
    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) {
            const record = JSON.parse(stored);
            setAttemptsLeft(record.attemptsLeft);
            if (record.submitted) {
                setAnswers(record.answers);
                setSubmitted(true);
                setScore(record.score);
            }
        }
    }, [key]);

    const handleAnswer = (qid: string, value: string) => {
        setAnswers({ ...answers, [qid]: value });
    };

    const handleSubmit = () => {
        const newScore = quizQuestions.reduce((acc: number, q: any) => {
            return acc + (q.acceptedAnswers.includes(answers[q._id]) ? q.points : 0);
        }, 0);

        const newAttempts = Math.max(attemptsLeft - 1, 0);
        setSubmitted(true);
        setScore(newScore);
        setAttemptsLeft(newAttempts);

        localStorage.setItem(key, JSON.stringify({
            answers,
            score: newScore,
            attemptsLeft: newAttempts,
            submitted: true
        }));
    };

    if (attemptsLeft <= 0) {
        return <h3 className="text-danger text-center mt-4">You have used all attempts for this quiz.</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>Take Quiz</h2>
            <p className="text-muted">Attempts left: {attemptsLeft}</p>
            {quizQuestions.map((q: any, index: number) => (
                <div key={q._id} className="mb-4 p-3 border">
                    <h5>
                        Question {index + 1}: {q.title} ({q.points} pts)
                    </h5>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(q.prompt) }} />

                    {q.questionType === "Multiple Choice" && (
                        <Form>
                            {q.possibleAnswers.map((a: any) => (
                                <Form.Check
                                    key={a._id}
                                    type="radio"
                                    label={a.answer}
                                    name={`q-${q._id}`}
                                    value={a._id}
                                    checked={answers[q._id] === a._id}
                                    onChange={() => handleAnswer(q._id, a._id)}
                                    disabled={submitted}
                                />
                            ))}
                        </Form>
                    )}

                    {q.questionType === "True/False" && (
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

                    {q.questionType === "Fill in the Blank" && (
                        <Form.Control
                            type="text"
                            value={answers[q._id] || ""}
                            onChange={(e) => handleAnswer(q._id, e.target.value)}
                            disabled={submitted}
                        />
                    )}

                    {submitted && (
                        <div className="mt-2">
                            {q.acceptedAnswers.includes(answers[q._id]) ? (
                                <span className="text-success">✔ Correct</span>
                            ) : (
                                <span className="text-danger">❌ Incorrect</span>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {!submitted && (
                <div className="text-end">
                    <Button variant="success" onClick={handleSubmit}>
                        Submit Quiz
                    </Button>
                </div>
            )}

            {submitted && score !== null && (
                <h4 className="mt-4 text-success">Your score: {score} points</h4>
            )}
        </div>
    );
}
