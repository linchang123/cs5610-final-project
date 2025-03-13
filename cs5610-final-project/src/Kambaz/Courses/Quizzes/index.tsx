import { IoMdArrowDropdown } from "react-icons/io";
import { Row, Col, Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../utility/GreenCheckMark";
import formatDate from "../utility/formatDate";
import { useNavigate, useParams } from "react-router";
import { RxRocket } from "react-icons/rx";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import FacultyFeatures from "../../Account/FacultyFeatures";
import { useState } from "react";
import { v4 as uuidv } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineStop } from "react-icons/ai";
import { deleteQuiz, publishQuiz } from "./reducers/reducer";
import "../../styles.css";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer); 
    const [quizId, setQuizId] = useState(uuidv());
    const navigate = useNavigate();
    {/** function for handling clicking on "+Quiz" button */}
    const handleButtonClick = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Editor`);
        setTimeout(() => setQuizId(uuidv4()), 500);
      }
    return (
      <div id="wd-quiz">
        <div className="text-nowrap py-3">
            <FacultyFeatures>
                <button id="wd-quizzes-option-btn" className="btn rounded-1 btn-lg btn-secondary float-end">
                    <IoEllipsisVertical className="fs-5"/></button>
                <button id="wd-add-quiz-btn" className="btn btn-lg rounded-1 btn-danger me-1 float-end" onClick={handleButtonClick}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz</button>
            </FacultyFeatures>
            <div className="position-relative border rounded-1 w-25 h-100 fs-4" style={{ top: "5px"}}>
                <FaMagnifyingGlass className="mx-2"/>
                <input placeholder="Search for Quiz" id="wd-search-quiz" className="border-0 fs-5" style={{width: "80%"}}/>
            </div>
        </div>
        <hr/>
        <QuizList quizzes={quizzes} cid={cid ? cid : ""}/>
      </div>
  );
}

const QuizList = ({quizzes, cid}:{quizzes: any; cid: string}) => {
    let currCourseQuiz = [];
    const { currentUser } = useSelector((state: any) => state.accountReducer); 
    if (currentUser.role === "FACULTY") {
        currCourseQuiz = quizzes.filter((quiz: any) => quiz.course === cid);
    } else {
        currCourseQuiz = quizzes.filter((quiz: any) => (quiz.course === cid && quiz.published == true));
    }
    if (currCourseQuiz.length > 0) {
        return (
            <div id="wd-quiz-list">
                <div id="wd-quizzes-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-4">
                    <IoMdArrowDropdown className="me-2 fs-3"/>
                    Assignment Quizzes
                </div>
                <ul id="wd-quiz-list" className="list-group rounded-0">
                {currCourseQuiz.map((quiz: any) => (
                    <Quiz quizTitle={quiz.title}  quizDue={formatDate(quiz.dueDate)}
                    quizURL={"#/Kambaz/Courses/" + cid + "/Quizzes/" + quiz._id}
                    // quizDetails=""
                    published={quiz.published}
                    quizId={quiz._id}
                    quizNumQuestions={quiz.numQuestions}
                    quizAvailableFrom={quiz.availableFromDate}
                    quizAvailableTil={quiz.availableTilDate}
                    quizPoints={quiz.points}/>))}
                </ul>
            </div>
        );
    } else {
        return (<FacultyFeatures><h3 className="text-center text-secondary">Click on "+ Quiz" button to add new quiz</h3></FacultyFeatures>);
    }
}

const Quiz = ({quizTitle, quizDue, quizURL, quizPoints, quizNumQuestions, published, quizId,
               quizAvailableFrom, quizAvailableTil
            }: {
        quizTitle: string; quizDue: string; quizURL: string; quizPoints: number; quizNumQuestions:number;
        published: boolean; quizId: string; quizAvailableFrom: string; quizAvailableTil: string
    }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const handlePublishSymbolClick = () => {dispatch(publishQuiz(quizId))};
        const handleDeleteButtonClick = () => {dispatch(deleteQuiz(quizId))};
        const handleEditButtonClick = () => {navigate(`${quizId}/Editor`)};
    return (
        <li className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center">
             <RxRocket className="m-2 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-2" style={{width: "90%"}}>
                 <a href={quizURL}
                  className="wd-quiz-link fw-bold text-black text-decoration-none fs-5" >
                  {quizTitle}
                 </a> 
                 <p className="m-0">
                    <span className="me-1"><QuizAvailability quizAvailableFrom={quizAvailableFrom} quizAvailableTil={quizAvailableTil}/></span> |
                     <span className="fw-bold mx-1">Due</span> {quizDue} | {quizPoints}pts | {quizNumQuestions} questions
                 </p>

             </div>
             <FacultyFeatures>
                <div className="d-flex align-items-center ms-3" style={{minWidth: "120px"}}>
                    <Row>
                        <Col><span onClick={handlePublishSymbolClick}>{published? <GreenCheckMark/>: <AiOutlineStop className="fs-2"/>}</span></Col>
                        <Col>
                            <Dropdown className="float-end me-2">
                                <Dropdown.Toggle id="wd-quiz-context-menu-btn" bsPrefix="btn" >
                                    <IoEllipsisVertical className="fs-4" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleEditButtonClick} id="wd-quiz-menu-edit-option">Edit</Dropdown.Item>
                                    <Dropdown.Item id="wd-quiz-menu-delete-option" onClick={handleDeleteButtonClick}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={handlePublishSymbolClick} id="wd-quiz-menu-publish-option">{published ? "Unpublish" : "Publish"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
             </FacultyFeatures>
        </li>
    );
};

const QuizAvailability = ({quizAvailableFrom, quizAvailableTil} : {quizAvailableFrom: string, quizAvailableTil: string}) => {
    const availableFrom = new Date(quizAvailableFrom);
    const availableTil = new Date(quizAvailableTil);
    const currDate = new Date(); 
    if (availableTil < currDate) {
        return(<strong>Closed</strong>);
    } else if (availableFrom <= currDate && currDate <= availableTil) {
        return(<strong>Available</strong>)
    } else if (currDate < availableFrom) {
        return(<span><strong>Not Available until </strong>{formatDate(quizAvailableFrom)}</span>)
    }
}