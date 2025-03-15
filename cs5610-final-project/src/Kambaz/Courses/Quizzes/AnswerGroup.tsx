import { useState } from "react";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";


export default function AnswerGroup({question, setQuestion}:{question: any; setQuestion: (q: any) => void}) {
    let answers = null;
    const [correctAnswer, setCorrectAnswer] = useState(-1);
    const handleAnotherAnswerButtonClick = () => {
        if (question.questionType === "True/False") {
            return;
        } else if (question.questionType === "Multiple Choice") {
            const updatedPossibleAnswers = [...question.possibleAnswers];
            updatedPossibleAnswers.push(""); 
            setQuestion({...question, possibleAnswers: updatedPossibleAnswers});
        } else if (question.questionType === "Fill in the Blank") {
            const updatedAcceptedAnswers = [...question.acceptedAnswers];
            updatedAcceptedAnswers.push(""); 
            setQuestion({...question, acceptedAnswers: updatedAcceptedAnswers});
        }
    }
    if (question.questionType === "Multiple Choice") {
        if (question.possibleAnswers.length > 0) {
            answers = question.possibleAnswers.map((answer: string, index: number) => (
            <Form.Group className={`mb-3 d-flex flex-column flex-md-row text-nowrap align-items-center`} controlId="answer">
                <span onClick={() => setCorrectAnswer(index)}>
                    <IoMdCheckmarkCircleOutline className={`fs-3 me-1 ${correctAnswer === index ? "text-success": ""}`} />
                    <Form.Label className={`me-3 mb-1 ${correctAnswer === index ? "text-success": "text-secondary"}`}>{correctAnswer === index ? "Correct Answer": "Possible Answer"}:</Form.Label>
                </span>
                <Form.Control className="w-75" value={answer} onChange={(e) => {
                    const updatedAnswers = [...question.possibleAnswers];
                    updatedAnswers[index] = e.target.value;
                    setQuestion({...question, possibleAnswers: updatedAnswers})}}/>
                <RxCross2 className="text-danger ms-2 fs-2" 
                onClick={() => {setQuestion({...question, possibleAnswers: question.possibleAnswers.filter((a: string, i: number) => i !== index )});}}/>
            </Form.Group>
            ));
        }
    } else if (question.questionType === "True/False") {
        answers = ["True", "False"].map((a: string) => (
            <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center">
                <Form.Check type="radio" label={a} name="true/false"/>
            </Form.Group>
        ));
    } else if (question.questionType === "Fill in the Blank"){
        if (question.acceptedAnswers.length > 0) {
            answers = question.acceptedAnswers.map((a: string, index: number) => (
                <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center" controlId="answer">
                    <Form.Label className="me-3 mb-1 text-nowrap">Possible Answer:</Form.Label>
                    <Form.Control className="w-75" value={a} onChange={(e) => {
                    const updatedAnswers = [...question.acceptedAnswers];
                    updatedAnswers[index] = e.target.value;
                    setQuestion({...question, acceptedAnswers: updatedAnswers})}}/>
                    <RxCross2 className="text-danger ms-2 fs-2" 
                onClick={() => {setQuestion({...question, acceptedAnswers: question.acceptedAnswers.filter((a: string, i: number) => i !== index )});}}/>
                </Form.Group>));
        }
    }
    // if (!answers){
    //     if (question.questionType === "Multiple Choice") {
    //         answers = (
    //             <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center" controlId="answer">
    //                 <Form.Label className="me-3 mb-1 text-nowrap">Possible Answer: </Form.Label>
    //                 <Form.Control className="w-75" value="" onChange={(e) => {
    //                         setQuestion({...question, possibleAnswers: [e.target.value]})}}/>
    //                 <RxCross2 className="text-danger ms-2 fs-2" 
    //             onClick={() => {setQuestion({...question, possibleAnswers: question.possibleAnswers.filter((a: string, i: number) => i !== 0 )});}}/>
    //             </Form.Group>)
    //     } else {
    //         answers = (
    //             <Form.Group className="mb-3 d-flex flex-column flex-md-row align-items-center" controlId="answer">
    //                 <Form.Label className="me-3 mb-1 text-nowrap">Possible Answer: </Form.Label>
    //                 <Form.Control className="w-75" value="" onChange={(e) => {
    //                         setQuestion({...question, acceptedAnswers: [e.target.value]})}}/>
    //                 <RxCross2 className="text-danger ms-2 fs-2" 
    //             onClick={() => {setQuestion({...question, acceptedAnswers: question.acceptedAnswers.filter((a: string, i: number) => i !== 0 )});}}/>
    //             </Form.Group>)
    //     }
        
    //}
    return (<div>
                {/* <h1>{correctAnswer}</h1> */}
                <div id="wd-quiz-question-answer-group" className="text-center d-flex flex-column align-items-center">{answers}</div>
                {question.questionType !== "True/False" && <button id="wd-quiz-add-another-answer-btn" className="text-center btn text-danger" onClick={handleAnotherAnswerButtonClick}><FaPlus className="mb-1 me-1" />Add Another Answer</button>}
            </div>);
}

  