import {Row, Col} from "react-bootstrap";
import { useParams, Link } from "react-router";
import quizProps from "./QuizProps";
import * as db from "../../Database";
import { TiPencil } from "react-icons/ti";
import editFields from "./editFields";

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
    return (
        <div id="wd-quiz-detail">
            <div className="text-center">
                <button id="wd-quiz-preview-btn" className="btn rounded-1 btn-md btn-secondary me-2">Preview</button>
                <button id="wd-quiz-edit-btn" className="btn rounded-1 btn-md btn-secondary">
                    <TiPencil className="me-1"/>
                    Edit
                </button>
            </div>
            <hr/>
            <h2 id="wd-quiz-detail-title" className="position-relative mb-5" style={{left: "10%"}}>{quizTitle}</h2>
            <QuizSetting/>
        </div>
    );
}

const QuizSetting = ({}) => {
    const selection = ["Graded Quiz", 29, "QUIZZES", "No", "30 Minutes", "No", "Always", 
        "Immediately", "Yes", "No", "No", "No", "No"];
    return (
        <div id="wd-quiz-detail-table" className="text-center position-relative w-75" >
            {selection.map((s, i) => (
            <Row className="my-2">
                <Col className="text-end fw-bold">{editFields[i]}</Col>
                <Col className="text-start">{s}</Col>
            </Row>
            ))}
        </div>
    );
}

const Availability = ({}) => {
    
}