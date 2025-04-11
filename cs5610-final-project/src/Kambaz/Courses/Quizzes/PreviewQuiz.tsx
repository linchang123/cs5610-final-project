// src/components/Quizzes/PreviewQuiz.tsx
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import DOMPurify from "dompurify";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function PreviewQuiz() {
    const { cid, qid } = useParams();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (currentUser.role !== "FACULTY") {
        return <Navigate to="/unauthorized" />;
    }

    const quizQuestions = questions.filter(
        (q: any) => q.course === cid && q.quiz === qid
    );

    const [answers, setAnswers] = useState<{ [id: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        localStorage.setItem(`preview-${currentUser._id}-${qid}`, JSON.stringify(answers));
    };

    const calculateScore = () => {
        let score = 0;
        for (let q of quizQuestions) {
            if (q.acceptedAnswers.includes(answers[q._id])) {
                score += q.points;
            }
        }
        return score;
    };

    return (
        <div className="container mt-4">
            <h2>Preview Quiz</h2>
            {quizQuestions.map((q: any, index: number) => (
                <div key={q._id} className="mb-4 p-3 border">
                    <h5>
                        Question {index + 1}: {q.title} ({q.points} pts)
                    </h5>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(q.prompt) }} />

                    {/* Multiple Choice */}
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

                    {/* True/False */}
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

                    {/* Fill in the Blank */}
                    {q.questionType === "Fill in the Blank" && (
                        <Form.Control
                            type="text"
                            value={answers[q._id] || ""}
                            onChange={(e) => handleAnswer(q._id, e.target.value)}
                            disabled={submitted}
                        />
                    )}

                    {/* 反馈 */}
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
