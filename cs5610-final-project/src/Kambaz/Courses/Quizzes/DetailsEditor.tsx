import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import quizProps from "./QuizProps";
import GreenCheckmark from "../utility/GreenCheckMark";
import { AiOutlineStop } from "react-icons/ai";
import { Nav } from "react-bootstrap";
import DetailsEditorTab from "./DetailsEditorTab";
import QuestionsEditorTab from "./QuestionsEditorTab";
import { useState } from "react";
import { addQuiz, updateQuiz } from "./reducers/reducer";

export default function QuizDetailsEditor() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    let currQuiz: quizProps;
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            currQuiz = {
                quizTitle: q.title,
                quizDue: q.dueDate,
                quizURL: "/Kambaz/Courses/" + cid + "/Quizzes/" + qid,
                quizPoints: q.points,
                quizAvailableFrom: q.availableFromDate,
                quizAvailableTil: q.availableTilDate,
                quizNumQuestions: q.numQuestions,
                quizDetails: q.description,
                quizType: q.quizType, 
                assignmentGroup: q.assignmentGroup, 
                shuffleAnswers: q.shuffleAnswers,
                timeLimit: q.timeLimit, 
                multipleAttempts: q.multipleAttempts, 
                attempts: q.attempts,
                showCorrectAnswers: q.showCorrectAnswers, 
                accessCode: q.accessCode, 
                oneQAtATime: q.oneQAtATime,  
                webcamRequired: q.webcamRequired, 
                lockQAfterAnswer: q.lockQAfterAnswer,
                published: q.published,
                newQuiz: false
            }
            return (<Editor quiz={currQuiz} cid={cid ? cid : ""} qid={qid ? qid : ""}/>);
        }
    }
    currQuiz = {
        quizTitle: "New Quiz",
        quizDue: "",
        quizURL: "/Kambaz/Courses/" + cid + "/Quizzes/" + qid,
        quizPoints: 0,
        quizAvailableFrom: "",
        quizAvailableTil: "",
        quizNumQuestions: 0, 
        quizDetails: "", 
        quizType: "Graded Quiz", 
        assignmentGroup: "QUIZZES", 
        shuffleAnswers: true, 
        timeLimit: 20,
        multipleAttempts: false, 
        attempts: 1, 
        showCorrectAnswers: true, 
        accessCode: "",
        oneQAtATime: true, 
        webcamRequired: false, 
        lockQAfterAnswer: false,
        published: false,
        newQuiz: true
    }
    return (
        <Editor quiz={currQuiz} cid={cid ? cid : ""} qid={qid ? qid : ""}/>
    );
}

const Editor = ({quiz, qid, cid}: {quiz: quizProps, qid: string, cid: string}) => {
        const { pathname } = useLocation();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [quizData, setQuizData] = useState<quizProps>(() => ({...quiz}));
        const handleSave = () => {
                const quiz = {
                    _id: qid, title: quizData.quizTitle, course: cid, dueDate: quizData.quizDue,
                    availableFromDate: quizData.quizAvailableFrom, availableTilDate: quizData.quizAvailableTil,
                    points: quizData.quizPoints, numQuestions: quizData.quizNumQuestions, quizType: quizData.quizType,
                    assignmentGroup: quizData.assignmentGroup, shuffleAnswers: quizData.shuffleAnswers, timeLimit: quizData.timeLimit,
                    multipleAttempts: quizData.multipleAttempts, attempts: quizData.attempts, showCorrectAnswers: quizData.showCorrectAnswers,
                    accessCode: quizData.accessCode, oneQAtATime: quizData.oneQAtATime, webcamRequired: quizData.webcamRequired,
                    lockQAfterAnswer: quizData.lockQAfterAnswer, published: quizData.published, description: quizData.quizDetails
                };
                if (quizData.newQuiz) {
                    dispatch(addQuiz(quiz))
                } else {
                    dispatch(updateQuiz(quiz))
                }
                navigate(quizData.quizURL);
            }
            const handleSaveAndPublish = () => {
                const quiz = {
                    _id: qid, title: quizData.quizTitle, course: cid, dueDate: quizData.quizDue,
                    availableFromDate: quizData.quizAvailableFrom, availableTilDate: quizData.quizAvailableTil,
                    points: quizData.quizPoints, numQuestions: quizData.quizNumQuestions, quizType: quizData.quizType,
                    assignmentGroup: quizData.assignmentGroup, shuffleAnswers: quizData.shuffleAnswers, timeLimit: quizData.timeLimit,
                    multipleAttempts: quizData.multipleAttempts, attempts: quizData.attempts, showCorrectAnswers: quizData.showCorrectAnswers,
                    accessCode: quizData.accessCode, oneQAtATime: quizData.oneQAtATime, webcamRequired: quizData.webcamRequired,
                    lockQAfterAnswer: quizData.lockQAfterAnswer, published: true, description: quizData.quizDetails
                }; 
                if (quizData.newQuiz) {
                    dispatch(addQuiz(quiz))
                } else {
                    dispatch(updateQuiz(quiz))
                }
                navigate(`/Kambaz/Courses/${cid}/Quizzes`);
            }
    return (
        <div id="wd-quiz-detail-editor">
            <div id="wd-quiz-detail-editor-header" className="d-flex flex-row-reverse align-items-center">
            <button id="wd-quizzes-detail-editor-options-btn" className="float-end btn rounded-1 btn-md btn-secondary">
                    <IoEllipsisVertical className="fs-5"/>
                </button>
                {quiz.published ? <span className="float-end mx-4 fs-4 justify-content-between"><GreenCheckmark/>Published</span> : 
                <span className="float-end text-secondary fs-4 mx-4 d-flex align-items-center justify-content-between"><AiOutlineStop/>Not Published</span>}
                <span className="fs-4 float-end">Points {quiz.quizPoints}</span>
            </div>
            <hr/>
            <div id="wd-quiz-detail-editor-tabs">
                <Nav variant="tabs">
                    <Nav.Item>
                    <Nav.Link as={Link} to={`${quiz.quizURL}/Editor/Details`} className={`bg-white ${pathname.includes("Details") ? "text-black border-top border-start border-end" : "text-danger border-bottom"}`}>Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link as={Link} to={`${quiz.quizURL}/Editor/Questions`} className={`bg-white ${pathname.includes("Questions") ? "text-black border-top border-start border-end" : "text-danger border-bottom"}`}>Questions</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div id="wd-quiz-detail-editor-body">
                <Routes>
                    <Route path="/" element={<Navigate to="Details" />} />
                    <Route path="Details" element={<DetailsEditorTab quizData={quizData} setQuizData={setQuizData}/>}/>
                    <Route path="Questions" element={<QuestionsEditorTab/>}/>
                </Routes>
            </div>
            <hr/>
            <div className="mt-3 position-relative text-end text-nowrap" style={{width: "76%", left: "10%"}}>
                <button onClick={() => {navigate(`/Kambaz/Courses/${cid}/Quizzes`)}} className="btn btn-md btn-secondary me-3">Cancel</button>
                <button onClick={handleSave} className="btn btn-md btn-danger">Save</button>
                <button onClick={handleSaveAndPublish} className="btn btn-md btn-success ms-3">Save and Publish</button>
            </div>
        </div>
    );
}

