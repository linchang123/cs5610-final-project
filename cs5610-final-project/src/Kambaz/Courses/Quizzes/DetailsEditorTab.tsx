import quizProps from "./QuizProps";
import { Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import TextEditor from "../utility/TextEditor";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { addQuiz, updateQuiz } from "./reducers/reducer";
import * as quizzesClient from "./client";
import {formatQuiz} from "../utility/formatQuiz";

export default function DetailsEditorTab({quizData, setQuizData}: {quizData: any; setQuizData: (q:any) => void}) {
    const navigate = useNavigate();
    const quizTypeOptions = ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"];
    const assignmentGroupOptions = ["QUIZZES", "ASSIGNMENTS", "EXAMS", "PROJECT"];
    let options : { [label: string]: keyof quizProps } = {"Shuffle Answers": "shuffleAnswers", 
                  "Show Correct Answers": "showCorrectAnswers", 
                  "One Question at a Time": "oneQAtATime", 
                  "Webcam Required": "webcamRequired", 
                  "Lock Questions After Answering": "lockQAfterAnswer"};
    const handleSave = async () => {
    const quizToSend = formatQuiz(quizData);
    if (quizData.newQuiz) {
        // dispatch(addQuiz(quiz))
        try {
            await quizzesClient.createQuiz(quizData.course, quizToSend)
        } catch (e) {
            alert("error occurs in creating quizzes")
        }
    } else {
        // dispatch(updateQuiz(quiz))
        try {
            await quizzesClient.updateQuiz(quizData._id, quizToSend)
        } catch (e) {
            alert("error occurs in updating quizzes")
        }
    }
    navigate(quizData.quizURL);
    }
    const handleSaveAndPublish = async () => {
        const quizToSend = formatQuiz({...quizData, published: true});
        if (quizData.newQuiz) {
            // dispatch(addQuiz({...quiz, published: true}))
            try {
                await quizzesClient.createQuiz(quizData.course, quizToSend)
            } catch (e) {
                alert("error occurs in creating quizzes")
            }
        } else {
            // dispatch(updateQuiz({...quiz, published: true}))
            try {
                await quizzesClient.updateQuiz(quizData._id, quizToSend)
            } catch (e) {
                alert("error occurs in updating quizzes")
            }
        }
        navigate(`/Kambaz/Courses/${quizData.course}/Quizzes`);
    }
    const handleAttemptsSetting = (allowMultipleAttempts: boolean) => {
        if (allowMultipleAttempts) {
            setQuizData({...quizData, multipleAttempts: allowMultipleAttempts })
        } else {
            setQuizData({...quizData, multipleAttempts: allowMultipleAttempts, attempts: 1 })
        }
    }
    return (
        <div id="wd-quiz-editor-details-tab">
            {/* {Object.entries(quizData).map(([key, val] : [key: string, val: any]) => (
                <p>{key}: {String(val)}</p>
            ))} */}
            <FormGroup >
                <FormControl className="w-75 form-control mt-3" id="wd-quiz-editor-details-quiz-title" value={quizData.title} onChange={(e) => setQuizData({...quizData, title: e.target.value})}/>
                <FormLabel className="mt-3 w-75">Quiz Instructions: </FormLabel>
                <div className="w-75 position-relative" style={{right: "8px"}}><TextEditor object={quizData} setObjectData={setQuizData} field={"description"}/></div>
            </FormGroup>
            <Row className="mt-3">
                <Col xs={3} className="text-end mt-1"><label htmlFor="wd-quiz-type">Quiz Type</label></Col>
                <Col xs={9} >
                    <FormSelect className="form-control" id="wd-quiz-type" style={{width: "67%"}} onChange={(e) => setQuizData({...quizData, quizType: e.target.value})}>
                        {quizTypeOptions.map((option) => (
                            <option selected={quizData.quizType === option} value={option}>
                                {option}
                            </option>
                        ))}
                    </FormSelect>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={3} className="text-end mt-1"><label htmlFor="wd-group">Assignment Group</label></Col>
                <Col xs={9} >
                    <FormSelect className="form-control" id="wd-group" style={{width: "67%"}} onChange={(e) => setQuizData({...quizData, assignmentGroup: e.target.value})}>
                        {assignmentGroupOptions.map((option) => (
                            <option selected={quizData.assignmentGroup === option} value={option}>
                                {option}
                            </option>
                        ))}
                    </FormSelect>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={3} className="text-end"></Col>
                <Col xs={9} >
                    <Form.Group as={Row} className="mb-3" controlId="options">
                        <Form.Label className="fw-bold">Options</Form.Label>
                        {Object.entries(options).map(([key, val] : [key: string, val: keyof quizProps]) => (
                            <Form.Check label={key} className="mt-2" id={key}
                            checked={quizData[val] as boolean} onChange={(e) => setQuizData({...quizData, [val]: (e.target as HTMLInputElement).checked })} />
                        ))}
                        <Form.Check className="me-3 mt-2" label={"Multiple Attempts"} checked={quizData.multipleAttempts} 
                        onChange={(e) => handleAttemptsSetting((e.target as HTMLInputElement).checked)}/>
                        {quizData.multipleAttempts && (
                            <Form.Group className="ms-3" id="wd-quiz-allowed-attempts" controlId="multipleAttempts"> 
                                <Form.Label className="m-0 my-1">Allowed Attempts</Form.Label>
                                <Form.Control className="w-25 mt-1" defaultValue={quizData.attempts} id="multipleAttempts"
                                onChange={(e) => setQuizData({...quizData, attempts: parseInt(e.target.value) })}/>
                            </Form.Group>
                        )}
                        <Form.Check className="me-3 mt-2" label={"Time Limit"} checked={quizData.timeLimit < Infinity || quizData.timeLimit == undefined} id="wd-quiz-time-limit"
                        onChange={(e) => setQuizData({...quizData, timeLimit: (e.target as HTMLInputElement).checked ? 20: Infinity })}/>
                        {(quizData.timeLimit < Infinity) && (
                            <Form.Group className="ms-3 d-flex align-items-center">
                                <Form.Control className="w-25 mt-1" defaultValue={quizData.timeLimit} onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value) || 0 })}/>
                                <Form.Label className="m-0 ms-2">Minutes</Form.Label>
                            </Form.Group>
                        )}
                        <Form.Check className="me-3 mt-2" label={"Access Code"} checked={quizData.accessCode !== ""} onChange={(e) => setQuizData({...quizData, accessCode: (e.target as HTMLInputElement).checked ? "1234": "" })
                         } id="wd-quiz-access-code"/>
                        {quizData.accessCode && (<Form.Control className="w-25 mt-1 ms-4" defaultValue={quizData.accessCode} onChange={(e) => setQuizData({...quizData, accessCode: e.target.value })}/>)}
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3 mb-5">
                <Col xs={3} className="text-end"><label>Assign</label></Col>
                <Col xs={9} className="border border-dark border-opacity-25 rounded" style={{width: "50%"}}>
                    <label className="pt-3" htmlFor="wd-assign-to">Assign to</label>
                    <FormSelect id="wd-assign-to" className="position-relative form-control" style={{top: "8px"}}>
                        <option value="No Selection">No Selection</option>
                        <option selected value="Everyone">Everyone</option>
                    </FormSelect>
                    <label className="pt-4" htmlFor="wd-due-date">Due</label><br/>
                    <input type="date" className="w-100 rounded form-control" value={quizData.dueDate} onChange={(e) => setQuizData({...quizData, dueDate: e.target.value})} id="wd-due-date"/><br/>
                    <div id="wd-css-responsive-forms-1">
                        <Row>
                            <Col md={6} xs={12} className="mb-3">
                                <Form.Group controlId="availableFromDate">
                                    <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                                    <Form.Control type="date" value={quizData.availableFromDate} onChange={(e) => setQuizData({...quizData, availableFromDate: e.target.value})} id="wd-available-from" />
                                </Form.Group>
                            </Col>
                            <Col md={6} xs={12} className="mb-3">
                                <Form.Group controlId="untilDate">
                                    <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                                    <Form.Control type="date" value={quizData.availableTilDate} onChange={(e) => setQuizData({...quizData, availableTilDate: e.target.value})} id="wd-available-until" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <hr/>
            <div className="mt-3 position-relative text-end text-nowrap" style={{width: "76%", left: "10%"}}>
                <button onClick={() => {navigate(`/Kambaz/Courses/${quizData.course}/Quizzes`)}} className="btn btn-md btn-secondary me-3">Cancel</button>
                <button onClick={handleSave} className="btn btn-md btn-danger">Save</button>
                <button onClick={handleSaveAndPublish} className="btn btn-md btn-success ms-3">Save and Publish</button>
            </div>
            </div>
    );
}

