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

export default function QuizDetailsEditor() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    let currQuiz: quizProps;
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            currQuiz = {
                ...q,
                quizURL: `/Kambaz/Courses/${cid}/Quizzes/${qid}`,
                newQuiz: false,
            }
            return (<Editor quiz={currQuiz}/>);
        }
    }
    currQuiz = {
        _id: qid ? qid: "",
        course: cid ? cid: "",
        title: "New Quiz",
        dueDate: "",
        quizURL: `/Kambaz/Courses/${cid}/Quizzes/${qid}`,
        points: 0,
        availableFromDate: "",
        availableTilDate: "",
        numQuestions: 0, 
        description: "", 
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
    return (<Editor quiz={currQuiz}/>);
}

const Editor = ({quiz}: {quiz: quizProps}) => {
        const { pathname } = useLocation();
        const [quizData, setQuizData] = useState<quizProps>(() => ({...quiz}));
    return (
        <div id="wd-quiz-detail-editor">
            <div id="wd-quiz-detail-editor-header" className="d-flex flex-row-reverse align-items-center">
            <button id="wd-quizzes-detail-editor-options-btn" className="float-end btn rounded-1 btn-md btn-secondary">
                    <IoEllipsisVertical className="fs-5"/>
                </button>
                {quiz.published ? <span className="float-end mx-4 fs-4 justify-content-between"><GreenCheckmark/>Published</span> : 
                <span className="float-end text-secondary fs-4 mx-4 d-flex align-items-center justify-content-between"><AiOutlineStop/>Not Published</span>}
                <span className="fs-4 float-end">Points {quiz.points}</span>
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
            
        </div>
    );
}

