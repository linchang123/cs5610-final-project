import { IoMdArrowDropdown } from "react-icons/io";
import { Row, Col } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../utility/GreenCheckMark";
import formatDate from "../utility/formatDate";
import { useParams } from "react-router";
import * as db from "../../Database";
import quizProps from "./QuizProps";
import { RxRocket } from "react-icons/rx";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

export default function Quizzess() {
    const { cid } = useParams();
    const quizzes = db.quizzes;

    return (
      <div id="wd-quiz">
        <div className="text-nowrap py-3">
            <button id="wd-add-quiz-btn" className="btn rounded-1 btn-lg btn-secondary float-end">
                <IoEllipsisVertical className="fs-5"/></button>
            <button id="wd-add-quiz-btn" className="btn btn-lg rounded-1 btn-danger me-1 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz</button>
            <div className="position-relative border rounded-1 w-25 h-100 fs-4" style={{ top: "5px"}}>
                <FaMagnifyingGlass className="mx-2"/>
                <input placeholder="Search for Quiz" id="wd-search-quiz" className="border-0 fs-5" style={{width: "80%"}}/>
            </div>
        </div>
        <hr/>
        <div id="wd-quizzes-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-4">
            <IoMdArrowDropdown className="me-2 fs-3"/>
            Assignment Quizzes
        </div>
        <ul id="wd-quiz-list" className="list-group rounded-0">
          {quizzes
          .filter((quiz: any) => quiz.course === cid)
          .map((quiz: any) => (
            <Quiz quizTitle={quiz.title}  
            quizDue={formatDate(quiz.dueDate) + " at 11:59pm"}
            quizURL={"#/Kambaz/Courses/" + cid + "/Quizzes/" + quiz._id}
            quizDetails=""
            quizNumQuestions={quiz.numQuestions}
            quizPoints={quiz.points}/>
          ))}
        </ul>
      </div>
  );}
  
const Quiz = ({quizTitle,
    quizDue, quizURL, quizPoints, quizNumQuestions}: quizProps) => {
    return (
        <li className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center">
             <RxRocket className="m-2 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-2" style={{width: "90%"}}>
                 <a href={quizURL}
                  className="wd-quiz-link fw-bold text-black text-decoration-none fs-5" >
                  {quizTitle}
                 </a> 
                 <p className="m-0">
                     <span className="fw-bold">Due</span> {quizDue} | {quizPoints}pts | {quizNumQuestions} questions
                 </p>

             </div>
             <div className="d-flex align-items-center ms-3" style={{minWidth: "68px"}}>
                 <Row>
                     <Col><GreenCheckMark/></Col>
                     <Col><IoEllipsisVertical className="fs-4" /></Col>
                 </Row>
             </div>
        </li>
    );
};

