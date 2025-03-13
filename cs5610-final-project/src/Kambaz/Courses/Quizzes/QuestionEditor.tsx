import { useState } from "react";
import { Col, Form,FormSelect, Row} from "react-bootstrap";
import TextEditor from "../utility/TextEditor";
import { FaPlus } from "react-icons/fa6";

export default function QuestionEditor({question}:{question: any}) {
    const questionType = ["Multiple Choice", "True/False", "Fill In the Blank"];
    const [questionData, setQuestionData] = useState({
        _id: question._id,
        title: question.title,
        points: question.points,
        questionType: question.questionType,
        prompt: question.prompt,
        possibleAnswers: question.possibleAnswers,
        acceptedAnswers: question.acceptedAnswers,
        course: question.course,
        quiz: question.quiz
    });
    return (
        <div className="w-100 border border-secondary my-5">
            <Form>
                <div className="float-end m-3">
                    <Form.Group className="d-flex align-items-center" style={{width: "80px"}}>
                        <Form.Label className="me-2">pts: </Form.Label>
                        <Form.Control defaultValue={questionData.points} onChange={(e) => setQuestionData({...questionData, points: parseInt(e.target.value)})} />
                    </Form.Group>
                </div>
                <div className="d-lg-flex">
                    <Form.Group controlId="formGridQuestionTitle" className="m-3 mb-0">
                        <Form.Control id="wd-question-title"  value={questionData.title} onChange={(e) => setQuestionData({...questionData, title: e.target.value})}/>
                    </Form.Group>

                    <Form.Group controlId="formGridQuestionType" className="mt-3 p-lg-0 px-3">
                        <FormSelect className="form-control"  as={Col} id="wd-quiz-type" onChange={(e) => setQuestionData({...questionData, questionType: e.target.value})}>
                            {questionType.map((q) => (
                                <option value={q} selected={questionData.questionType === q}>{q}
                                </option>))}
                        </FormSelect>
                    </Form.Group>
                </div>
                <hr/>
            </Form>
            <QuestionInstruction questionType={questionData.questionType}/>
            <h5 className="text-start m-3 fw-bold">Question: </h5>
            <TextEditor object={questionData} setObjectData={setQuestionData} field="prompt"/>
            <h5 className="text-start m-3 fw-bold">Answers: </h5>
            <AnswerGroup question={questionData}/>
            <button id="wd-quiz-add-another-answer-btn" className="text-center btn text-danger"><FaPlus className="mb-1 me-1"/>Add Another Answer</button>
            <br/><br/>
            <QuestionControlButtons/>
        </div>
    );
}

function AnswerGroup({question}:{question: any}) {
    const questionType = question.questionType;
    const possibleAnswers = question.possibleAnswers;
    const acceptedAnswers = question.acceptedAnswers;
    let answers = null;
    if (questionType === "Multiple Choice") {
        if (possibleAnswers.length > 0) {
            answers = possibleAnswers.map((a: string) => (
            <Form.Group className="mb-3 d-flex align-items-center" controlId="answer">
                <Form.Label className="me-3 mb-1">Possible Answer:</Form.Label>
                <Form.Control className="w-50" value={a} />
            </Form.Group>));
        }
    } else if (questionType === "True/False") {
        answers = ["True", "False"].map((a: string) => (
            <Form.Group className="mb-3 d-flex align-items-center">
                <Form.Check type="radio" label={a} name="true/false"/>
            </Form.Group>
        ));
    } else {
        if (acceptedAnswers.length > 0) {
            answers = acceptedAnswers.map((a: string) => (
                <Form.Group className="mb-3 d-flex align-items-center" controlId="answer">
                    <Form.Label className="me-3 mb-1">Possible Answer:</Form.Label>
                    <Form.Control className="w-50" value={a} />
                </Form.Group>));
        }
    }
    if (!answers){
        answers = (
        <Form.Group className="mb-3 d-flex align-items-center" controlId="answer">
            <Form.Label className="me-3 mb-1">Possible Answer</Form.Label>
            <Form.Control className="w-50" value="" />
        </Form.Group>)
    }
    return (<div id="wd-quiz-question-answer-group" className="text-center d-flex flex-column align-items-center">{answers}</div>);
}


function QuestionControlButtons() {
    return(
        <div className="float-start m-3">
            <button>Cancel</button>
            <button>Save Question</button>
        </div>
    );
}

function QuestionInstruction({questionType}: {questionType: string}) {
    let instruction = [];
    if (questionType === "Multiple Choice") {
        instruction = ["Enter your question and multiple answers, then select the one correct answer."]
    } else if (questionType === "True/False") {
        instruction = ["Enter your question text, then select if True or False is the correct answer."]
    } else {
        instruction = ["Enter your question text, then define all possible correct answers for the blank.", 
            "Students will see the question followed by a small text box to type their answer."]
    }
    return (instruction.map(i => (<p className="text-start my-0 ms-3">{i}</p>)))
}