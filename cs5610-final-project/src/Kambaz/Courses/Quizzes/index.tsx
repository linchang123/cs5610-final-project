import { IoMdArrowDropdown } from "react-icons/io";
import { Row, Col, Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../utility/GreenCheckMark";
import formatDate from "../utility/formatDate";
import { useNavigate, useParams } from "react-router";
import { RxRocket } from "react-icons/rx";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import FacultyFeatures from "../../Account/FacultyFeatures";
import { useEffect, useState } from "react";
import { v4 as uuidv } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineStop } from "react-icons/ai";
import { deleteQuiz, publishQuiz, setQuizzes } from "./reducers/reducer";
import * as quizzesClient from "./client";
import "../../styles.css";
import {formatQuiz} from "../utility/formatQuiz";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer); 
    const [quizId, setQuizId] = useState(uuidv());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    {/** function for handling clicking on "+Quiz" button */}
    const handleButtonClick = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Editor`);
        setTimeout(() => setQuizId(uuidv4()), 500);
      }
    const fetchQuizzes = async () => {
    try {
        const quizzes = await quizzesClient.fetchQuizzesForCourse(cid as string);
        let currQuiz = [];
        for (const q of quizzes) {
            try {
                const numQuestions = await quizzesClient.fetchQuizQuestionCount(q._id as string);
                const points = await quizzesClient.fetchQuizPoints(q._id as string);
                currQuiz.push({...q, numQuestions, points});
            } catch(e) {
                alert("erorr occurs in fetching points or questions");
            }
        }
        dispatch(setQuizzes(currQuiz));
    } catch (error: any) {
        alert("error occurs in fetching quizzes")
    }
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);
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
    if (currentUser.role === "STUDENT") {
        currCourseQuiz = quizzes.filter((quiz: any) => (quiz.published == true));
    } else {
        currCourseQuiz = quizzes;
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
                    quizAvailableFrom={quiz.availableDate}
                    quizAvailableTil={quiz.untilDate}
                    numQuestions={quiz.numQuestions}
                    points={quiz.points}
                    quiz={quiz}/>))}
                </ul>
            </div>
        );
    } else {
        return (<FacultyFeatures><h3 className="text-center text-secondary">Click on "+ Quiz" button to add new quiz</h3></FacultyFeatures>);
    }
}

const Quiz = ({quizTitle, quizDue, quizURL, published, quizId,
               quizAvailableFrom, quizAvailableTil, numQuestions, quiz, points
            }: {
        quizTitle: string; quizDue: string; quizURL: string; quiz: any;
        published: boolean; quizId: string; quizAvailableFrom: string; quizAvailableTil: string; numQuestions: number; points: number
    }) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const handlePublishSymbolClick = async () => {
            try {
                await quizzesClient.updateQuiz(quiz._id, {...quiz, published: !quiz.published})
                dispatch(publishQuiz(quizId));
            } catch (e) {
                alert("error occurs in updating quizzes")
            }
        };
        const handleDeleteButtonClick = async () => {
            try {
                await quizzesClient.deleteQuiz(quiz._id);
                dispatch(deleteQuiz(quizId));
            } catch (e) {
                alert("error occurs in deleting quizzes")
            }
            };
        const handleEditButtonClick = () => {navigate(`${quizId}`)};
        // const { questions } = useSelector((state: any) => state.questionsReducer);
        const { currentUser } = useSelector((state: any) => state.accountReducer); 
        // const questionsInQuiz = questions
        // .filter((q:any) => q.course === courseId && q.quiz === quizId);
        // const quizPoints = questionsInQuiz
        // .reduce((sum: any, q: { points: any; }) => sum + q.points, 0);
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
                     <span className="fw-bold mx-1">Due</span> {quizDue} | {points} pts | {numQuestions} questions
                     {currentUser.role === "STUDENT" ? "| Score 0pt" : ""}
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