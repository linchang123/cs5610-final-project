import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router";
import quizProps from "./QuizProps";
import { TiPencil } from "react-icons/ti";
import formatDate from "../utility/formatDate";
import "../../styles.css";
import { useSelector } from "react-redux";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const questionsInQuiz = questions
        .filter((q: any) => q.course === cid && q.quiz === qid);
    const quizPoints = questionsInQuiz
        .reduce((sum: any, q: { points: any; }) => sum + q.points, 0);
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            const quiz = {
                ...q,
                quizURL: `/Kambaz/Courses/${cid}/Quizzes/${qid}`,
                newQuiz: false,
                points: quizPoints,
                numQuestions: questionsInQuiz
            }
            return (<Details quiz={quiz} />);
        }
    }
    return (<h1>Details</h1>);
}

const Details = ({ quiz }: { quiz: quizProps }) => {
    const quizEditorPath = `${quiz.quizURL}/Editor`
    const editFields = {
        "Quiz Type": quiz.quizType,
        "Points": quiz.points,
        "Assignment Group": quiz.assignmentGroup,
        "Shuffle Answers": capitalizedYesNo(quiz.shuffleAnswers),
        "Time Limit": quiz.timeLimit + " Minutes",
        "Multiple Attempts": capitalizedYesNo(quiz.multipleAttempts),
        "How Many Attempts": quiz.attempts,
        "Show Correct Answers": capitalizedYesNo(quiz.showCorrectAnswers),
        "Access Code": quiz.accessCode ? quiz.accessCode : "None",
        "One Question at a Time": capitalizedYesNo(quiz.oneQAtATime),
        "Webcam Required": capitalizedYesNo(quiz.webcamRequired),
        "Lock Questions After Answering": capitalizedYesNo(quiz.lockQAfterAnswer)
    };
    return (
        <div id="wd-quiz-detail">
            <div className="text-center" id="wd-quiz-detail-buttons">
                <Link
                    to={`${quiz.quizURL}/Preview`}
                    id="wd-quiz-preview-btn"
                    className="btn rounded-1 btn-md btn-secondary me-2"
                >
                    Preview
                </Link>

                <Link to={quizEditorPath} id="wd-quiz-edit-btn" className="btn rounded-1 btn-md btn-secondary">
                    <TiPencil className="me-1" />
                    Edit
                </Link>
            </div>
            <hr />
            <h2 id="wd-quiz-detail-title" className="mb-5" >{quiz.title}</h2>
            <div id="wd-quiz-detail-table" className="text-center" >
                {Object.entries(editFields).map(([key, val]: [key: string, val: any]) => (
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
                <hr className="m-1" />
                <div className="d-grid grid-template-columns-4 text-start">
                    <div className="">{formatDate(quiz.dueDate)}</div>
                    <div>Everyone</div>
                    <div>{formatDate(quiz.availableFromDate)}</div>
                    <div>{formatDate(quiz.availableTilDate)}</div>
                </div>
                {/* <hr/> */}
            </div>
        </div>
    );
}

function capitalizedYesNo(x: boolean): string {
    const str = x ? "Yes" : "No"
    return str;
    // return str.charAt(0).toUpperCase() + str.slice(1);
}