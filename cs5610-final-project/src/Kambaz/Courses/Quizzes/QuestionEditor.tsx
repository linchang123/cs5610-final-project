import { useState } from "react";
import { Col, Form,FormSelect} from "react-bootstrap";
import TextEditor from "../utility/TextEditor";
import AnswerGroup from "./AnswerGroup";
import { useDispatch } from "react-redux";
import { updateQuestion, editQuestion} from "./reducers/questionsReducer";

export default function QuestionEditor({question}:{question: any}) {
    const dispatch = useDispatch();
    const questionType = ["Multiple Choice", "True/False", "Fill in the Blank"];
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
    const handleSaveQuestionEdit = () => {
        dispatch(updateQuestion({...questionData}))
    };
    const handleCancelQuestionEdit = () => {
        dispatch(editQuestion({_id: questionData._id, edit: false}))
    };
    return (
        <div className="w-100 border border-secondary my-5">
            <Form>
                <div className="float-end m-3">
                    <Form.Group className="d-flex align-items-center" style={{width: "130px"}}>
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
            <AnswerGroup question={questionData} setQuestion={setQuestionData}/>
            <br/><br/>
            <div className="float-start m-3">
                <button className="btn btn-md btn-secondary me-3" onClick={handleCancelQuestionEdit}>Cancel</button>
                <button className="btn btn-md btn-danger" onClick={handleSaveQuestionEdit}>Save Question</button>
            </div>
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