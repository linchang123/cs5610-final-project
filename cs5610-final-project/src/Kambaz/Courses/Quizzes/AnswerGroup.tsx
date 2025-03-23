import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


export default function AnswerGroup({question, setQuestion}:{question: any; setQuestion: (q: any) => void}) {
    let answers = null;
    const handleAnotherAnswerButtonClick = () => {
        if (question.questionType === "True/False") {
            return;
        } else if (question.questionType === "Multiple Choice") {
            const updatedPossibleAnswers = [...question.possibleAnswers, {_id: uuidv4(), answer: ""}];
            setQuestion({...question, possibleAnswers: updatedPossibleAnswers});
        } else if (question.questionType === "Fill in the Blank") {
            const newAnswer = {_id: uuidv4(), answer: ""}
            setQuestion({...question, acceptedAnswers: [...question.acceptedAnswers, newAnswer._id],
                possibleAnswers: [...question.possibleAnswers, newAnswer]
            });
        }
    }
    const handleSetCorrectAnswer = (answerId: string) => {
        // if (question.questionType === "Multiple Choice"){
        //     let updatedAcceptedAnswers = null
        //     if (question.acceptedAnswers.includes(answerId)) {
        //         updatedAcceptedAnswers = question.acceptedAnswers.filter((a:any) => a !== answerId);
        //     } else {
        //         updatedAcceptedAnswers = [...question.acceptedAnswers, answerId];
        //     }
        //     setQuestion({...question, acceptedAnswers: updatedAcceptedAnswers})
        // } else if (question.questionType === "True/False") {
            if (question.acceptedAnswers.includes(answerId)) {
                setQuestion({...question, acceptedAnswers: []})
            } else {
                setQuestion({...question, acceptedAnswers: [answerId]})
            }
        // }
        
    }
    const handleUpdateAnswerValue = (answerId: string, targetVal: string) => {
        const updatedAnswers = question.possibleAnswers.map((a: any) => a._id === answerId ? { ...a, answer: targetVal } : a);
        setQuestion({ ...question, possibleAnswers: updatedAnswers });
    };
    const handleDeleteAnswer = (answerId: string) => {
        setQuestion({...question, 
            possibleAnswers: question.possibleAnswers.filter((a: any) => a._id !== answerId), 
            acceptedAnswers: question.acceptedAnswers.filter((a: any) => a !== answerId)
        });
    }
    if (question.questionType === "Multiple Choice") {
        if (question.possibleAnswers.length > 0) {
            answers = question.possibleAnswers.map((answer: any) => (
            <Form.Group className={`mb-3 d-flex flex-column flex-md-row text-nowrap align-items-center`} controlId="answer">
                <span onClick={() => handleSetCorrectAnswer(answer._id)}>
                    <IoMdCheckmarkCircleOutline className={`fs-3 me-1 ${question.acceptedAnswers.includes(answer._id) ? "text-success": ""}`} />
                    <Form.Label className={`me-3 mb-1 ${question.acceptedAnswers.includes(answer._id) ? "text-success": "text-secondary"}`}>{question.acceptedAnswers.includes(answer._id) ? "Correct Answer": "Possible Answer"}:</Form.Label>
                </span>
                <Form.Control className="w-75" value={answer.answer} onChange={(e) => {handleUpdateAnswerValue(answer._id, e.target.value)}}/>
                <RxCross2 className="text-danger ms-2 fs-2" onClick={() => handleDeleteAnswer(answer._id)}/>
            </Form.Group>
            ));
        }
    } else if (question.questionType === "True/False") {
        answers = ["True", "False"].map((a: string) => (
            <Form.Group className="mb-3 d-flex flex-column flex-sm-row align-items-center" >
                <IoMdCheckmarkCircleOutline className={`fs-3 ${question.acceptedAnswers.includes(a) ? "text-success": ""}` } onClick={() => handleSetCorrectAnswer(a)}/>
                <span onClick={() => handleSetCorrectAnswer(a)}>
                    <Form.Check type="radio" className={`wd-question-editor-truefalse-radio ${question.acceptedAnswers.includes(a) ? "text-success": ""}`} 
                    label={a} name="true/false"/>
                </span>
            </Form.Group>
        ));
    } else if (question.questionType === "Fill in the Blank"){
        if (question.acceptedAnswers.length > 0) {
            answers = question.possibleAnswers.map((a: any) => (
                <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center " controlId="answer">
                    <Form.Label className="me-3 mb-1 text-nowrap">Possible Answer:</Form.Label>
                    <Form.Control className="w-75" value={a.answer} onChange={(e) => {handleUpdateAnswerValue(a._id, e.target.value)}}/>
                    <RxCross2 className="text-danger ms-2 fs-2" onClick={() => handleDeleteAnswer(a._id)}/>
                </Form.Group>));
        }
    }
    return (<div>
                <div id="wd-quiz-question-answer-group" className="text-center d-flex flex-column align-items-center">{answers}</div>
                {question.questionType !== "True/False" && <button id="wd-quiz-add-another-answer-btn" className="text-center btn text-danger" onClick={handleAnotherAnswerButtonClick}><FaPlus className="mb-1 me-1" />Add Another Answer</button>}
            </div>);
}

  