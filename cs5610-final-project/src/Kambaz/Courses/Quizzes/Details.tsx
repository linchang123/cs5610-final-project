import {Row, Col} from "react-bootstrap";
import { useParams, Link } from "react-router";
import quizProps from "./QuizProps";
import { TiPencil } from "react-icons/ti";
import formatDate from "../utility/formatDate";
import "../../styles.css";
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            return (
                <Details 
                    quizTitle={q.title}
                    quizDue={q.dueDate}
                    quizURL={"/Kambaz/Courses/" + cid + "/Quizzes/" + qid}
                    quizPoints={q.points}
                    quizAvailableFrom={q.availableFromDate}
                    quizAvailableTil={q.availableTilDate}
                    quizNumQuestions={q.numQuestions} 
                    quizDetails={q.quizDetails} 
                    quizType={q.quizType} 
                    assignmentGroup={q.assignmentGroup.toUpperCase()} 
                    shuffleAnswers={q.shuffleAnswers} 
                    timeLimit={q.timeLimit} 
                    multipleAttempts={q.multipleAttempts} 
                    attempts={q.attempts} 
                    showCorrectAnswers={q.showCorrectAnswers} 
                    accessCode={q.accessCode} 
                    oneQAtATime={q.oneQAtATime} 
                    webcamRequired={q.webcamRequired} 
                    lockQAfterAnswer={q.lockQAfterAnswer}
                    published={q.published}/>
            );
        }
    }
    return (<h1>Details</h1>);
}

const Details = ({quizTitle, quizURL, quizPoints, quizAvailableFrom, quizAvailableTil, quizDue,
    quizType, assignmentGroup, shuffleAnswers, timeLimit, multipleAttempts, showCorrectAnswers,
    oneQAtATime, webcamRequired, lockQAfterAnswer}: quizProps) => {
    const quizEditorPath = `${quizURL}/Editor`
    const editFields = {
        "Quiz Type": quizType,
        "Points": quizPoints,
        "Assignment Group": assignmentGroup,
        "Shuffle Answers": capitalizedYesNo(shuffleAnswers),
        "Time Limit": timeLimit,
        "Multiple Attempts": capitalizedYesNo(multipleAttempts),
        "Show Correct Answers": capitalizedYesNo(showCorrectAnswers),
        "One Question at a Time": capitalizedYesNo(oneQAtATime),
        "Webcam Required": capitalizedYesNo(webcamRequired),
        "Lock Questions After Answering": capitalizedYesNo(lockQAfterAnswer)
    };
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
            <div id="wd-quiz-detail-table" className="text-center" >
            {Object.entries(editFields).map(([key, val] : [key: string, val: any]) => (
            <Row className="my-2">
                <Col className="text-end fw-bold">{key}</Col>
                <Col className="text-start">{val}</Col>
            </Row>
            ))}
        </div>
            <div id="wd-quiz-detail-availability-table" className="mt-5 px-5">
                <div className="d-grid grid-template-columns-4 text-start">
                    <div>Due</div>
                    <div>For</div>
                    <div>Available from</div>
                    <div>Until</div>
                </div>
                <hr className="m-1"/>
                <div className="d-grid grid-template-columns-4 text-start">
                    <div className="">{formatDate(quizDue)} at 1pm</div>
                    <div>Everyone</div>
                    <div>{formatDate(quizAvailableFrom)} at 11:40am</div>
                    <div>{formatDate(quizAvailableTil)} at 1pm</div>
                </div>
            </div>
        </div>
    );
}

function capitalizedYesNo(x: boolean): string {
    const str = x ? "Yes" : "No"
    return str;
    // return str.charAt(0).toUpperCase() + str.slice(1);
  }