import {Row, Col} from "react-bootstrap";
import { useParams, Link } from "react-router";
import quizProps from "./QuizProps";
import * as db from "../../Database";
import { TiPencil } from "react-icons/ti";
import editFields from "./editFields";
import formatDate from "../utility/formatDate";
import "../../styles.css";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const quizzes = db.quizzes;
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            return (
                <Details quizTitle={q.title} 
                quizDue={q.dueDate}
                quizURL={"/Kambaz/Courses/" + cid + "/Quizzes/" + qid}
                quizPoints={q.points}
                quizDetails=""
                quizNumQuestions={q.numQuestions}/>
            );
        }
    }
}

const Details = ({quizTitle, quizDue, quizURL, quizPoints}: quizProps) => {
    const formattedDate = formatDate(quizDue)
    const quizEditorPath = `${quizURL}/Editor`
    return (
        <div id="wd-quiz-detail">
            <div className="text-center" id="wd-quiz-detail-buttons">
                <button id="wd-quiz-preview-btn" className="btn rounded-1 btn-md btn-secondary me-2">Preview</button>
                <Link to={quizEditorPath} id="wd-quiz-edit-btn" className="btn rounded-1 btn-md btn-secondary">
                    <TiPencil className="me-1"/>
                    Edit
                </Link>
            </div>
            <hr/>
            <h2 id="wd-quiz-detail-title" className="mb-5" >{quizTitle}</h2>
            <QuizSetting/>
            <div id="wd-quiz-detail-availability-table" className="mt-5 px-5">
                <div className="d-grid grid-template-columns-4 text-start">
                    <div>Due</div>
                    <div>For</div>
                    <div>Available from</div>
                    <div>Until</div>
                </div>
                <hr className="m-1"/>
                <div className="d-grid grid-template-columns-4 text-start">
                    <div className="">{formattedDate} at 1pm</div>
                    <div>Everyone</div>
                    <div>{formattedDate} at 11:40am</div>
                    <div>{formattedDate} at 1pm</div>
                </div>
            </div>
        </div>
    );
}

const QuizSetting = ({}) => {
    const selection = ["Graded Quiz", 29, "QUIZZES", "No", "30 Minutes", "No", "Always", 
        "Immediately", "Yes", "No", "No", "No", "No"];
    return (
        // <div id="wd-quiz-detail-table" className="text-center position-relative w-75" >
        <div id="wd-quiz-detail-table" className="text-center" >
            {selection.map((s, i) => (
            <Row className="my-2">
                <Col className="text-end fw-bold">{editFields[i]}</Col>
                <Col className="text-start">{s}</Col>
            </Row>
            ))}
        </div>
    );
}