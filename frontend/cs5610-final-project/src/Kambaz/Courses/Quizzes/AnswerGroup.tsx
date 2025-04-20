// import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


export default function AnswerGroup({question, setQuestion}:{question: any; setQuestion: (q: any) => void}) {
    let answers = null;
    const handleAnotherAnswerButtonClick = () => {
        const newAnswerId = uuidv4(); 
        if (question.questionType === "True/False") {
            return;
        } else if (question.questionType === "Multiple Choice") {
            const updatedPossibleAnswers = [...question.possibleAnswers, {id: newAnswerId, value: ""}];
            const updatedChoices = [...question.choices, {id: newAnswerId, text: "", isCorrect: false}];
            setQuestion({...question, possibleAnswers: updatedPossibleAnswers, choices: updatedChoices});
        } else if (question.questionType === "Fill in the Blank") {
            setQuestion({...question, possibleAnswers: [...question.possibleAnswers, {id: newAnswerId,  value: ""}],
                answers: [...question.answers, {id: newAnswerId, value: ""}]
            });
        }
    }
    const handleSetCorrectAnswer = (answerId: string) => {
        if (question.questionType === "Multiple Choice"){
            const updatedChoices = question.choices.map((a: any) => {
                if (a.id === answerId){
                    return {...a, isCorrect: !a.isCorrect};
                } else {
                    return {...a, isCorrect: false};
                }
            });
            setQuestion({...question, choices: updatedChoices});
        } else if (question.questionType === "True/False") {
            // here a is "True" or "False"
           const updatedCorrectAnswer = (answerId === "True" ? {id: "QQ110-ans1", value: true}: {id: "QQ110-ans2", value: false});
           setQuestion({...question, correctAnswer: updatedCorrectAnswer})
        }
        // }
        
    }
    const handleUpdateAnswerValue = (answerId: string, targetVal: string) => {
        if (question.questionType === "Multiple Choice") {
            const updatedAnswers = question.possibleAnswers.map((a: any) => a.id === answerId ? { ...a, value: targetVal } : a);
            const updatedChoices = question.choices.map((a: any) => a.id === answerId ? { ...a, text: targetVal } : a);
            setQuestion({ ...question, possibleAnswers: updatedAnswers, choices: updatedChoices });
        } else if (question.questionType === "Fill in the Blank") {
            const updatedPAnswers = question.possibleAnswers.map((a: any) => a.id === answerId ? { ...a, value: targetVal } : a);
            const updatedAnswers = question.answers.map((a: any) => a.id === answerId ? { ...a, value: targetVal } : a);
            setQuestion({ ...question, possibleAnswers: updatedPAnswers, answers: updatedAnswers });
        }
    };
    const handleDeleteAnswer = (answerId: string) => {
        if (question.questionType === "Multiple Choice") {
            setQuestion({...question, 
                possibleAnswers: question.possibleAnswers.filter((a: any) => a.id !== answerId), 
                choices: question.choices.filter((a: any) => a.id !== answerId)
            })
        } else if (question.questionType === "Fill in the Blank") {
            setQuestion({...question, 
                possibleAnswers: question.possibleAnswers.filter((a: any) => a.id !== answerId), 
                answers: question.answers.filter((a: any) => a.id !== answerId),
            })
        }
    }
    if (question.questionType === "Multiple Choice") {
        if (question.choices.length > 0) {
            answers = question.choices.map((answer: any) => (
            <Form.Group className={`mb-3 d-flex flex-column flex-md-row text-nowrap align-items-center`} controlId="answer">
                <span onClick={() => handleSetCorrectAnswer(answer.id)}>
                    <IoMdCheckmarkCircleOutline className={`fs-3 me-1 ${answer.isCorrect ? "text-success": ""}`} />
                    <Form.Label className={`me-3 mb-1 ${answer.isCorrect ? "text-success": "text-secondary"}`}>{answer.isCorrect ? "Correct Answer": "Possible Answer"}:</Form.Label>
                </span>
                <Form.Control className="w-75" value={answer.text} onChange={(e) => {handleUpdateAnswerValue(answer.id, e.target.value)}}/>
                <RxCross2 className="text-danger ms-2 fs-2" onClick={() => {handleDeleteAnswer(answer.id)}}/>
            </Form.Group>
            ));
        }
    } else if (question.questionType === "True/False") {
        answers = ["True", "False"].map((a: string) => (
            <Form.Group className="mb-3 d-flex flex-column flex-sm-row align-items-center" >
                <IoMdCheckmarkCircleOutline className={`fs-3 ${question.correctAnswer.value === convertStrToBool(a) ? "text-success": ""}` } onClick={() => handleSetCorrectAnswer(a)}/>
                <span onClick={() => handleSetCorrectAnswer(a)}>
                    <Form.Check type="radio" className={`wd-question-editor-truefalse-radio ${question.correctAnswer.value === convertStrToBool(a) ? "text-success": ""}`} 
                    label={a} name="true/false"/>
                </span>
            </Form.Group>
        ));
    } else if (question.questionType === "Fill in the Blank"){
        if (question.possibleAnswers.length > 0) {
            answers = question.possibleAnswers.map((a: any) => (
                <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center " controlId="answer">
                    <Form.Label className="me-3 mb-1 text-nowrap">Possible Answer:</Form.Label>
                    <Form.Control className="w-75" value={a.value} onChange={(e) => {handleUpdateAnswerValue(a.id, e.target.value)}}/>
                    <RxCross2 className="text-danger ms-2 fs-2" onClick={() => handleDeleteAnswer(a.id)}/>
                </Form.Group>));
        }
    }
    return (<div>
                <div id="wd-quiz-question-answer-group" className="text-center d-flex flex-column align-items-center">{answers}</div>
                {question.questionType !== "True/False" && <button id="wd-quiz-add-another-answer-btn" className="text-center btn text-danger" onClick={handleAnotherAnswerButtonClick}><FaPlus className="mb-1 me-1" />Add Another Answer</button>}
            </div>);
}

function convertStrToBool(s: string) {
    return (s === "True");
}