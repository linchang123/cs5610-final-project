import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import quizProps from "./QuizProps";
import GreenCheckmark from "../utility/GreenCheckMark";
import { AiOutlineStop } from "react-icons/ai";

export default function QuizDetailsEditor() {
    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    for (const q of quizzes) {
        if (q.course === cid && q._id === qid) {
            return (
                <Editor
                    quizTitle={q.title}
                    quizDue={q.dueDate}
                    quizURL={"/Kambaz/Courses/" + cid + "/Quizzes/" + qid}
                    quizPoints={q.points}
                    quizAvailableFrom={q.availableFromDate}
                    quizAvailableTil={q.availableTilDate}
                    quizNumQuestions={q.numQuestions} 
                    quizDetails={q.quizDetails} 
                    quizType={q.quizType} 
                    assignmentGroup={q.assignmentGroup} 
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
    return (
        <Editor
            quizTitle={"New Quiz"}
            quizDue={""}
            quizURL={"/Kambaz/Courses/" + cid + "/Quizzes/" + qid}
            quizPoints={0}
            quizAvailableFrom={""}
            quizAvailableTil={""}
            quizNumQuestions={0} 
            quizDetails={""} 
            quizType={"Graded Quiz"} 
            assignmentGroup={"QUIZZES"} 
            shuffleAnswers={true} 
            timeLimit={20} 
            multipleAttempts={false} 
            attempts={1} 
            showCorrectAnswers={true} 
            accessCode={""} 
            oneQAtATime={true} 
            webcamRequired={false} 
            lockQAfterAnswer={false}
            published={false}/>
    );
    //return (<h1>Quiz Details Editor</h1>)
}

const Editor = ({quizTitle, quizURL, quizPoints, quizAvailableFrom, quizAvailableTil, quizDue,
    quizType, assignmentGroup, shuffleAnswers, timeLimit, multipleAttempts, showCorrectAnswers,
    oneQAtATime, webcamRequired, lockQAfterAnswer, published}: quizProps) => {
    return (
        <div id="wd-quiz-detail-editor">
            <div id="wd-quiz-detail-editor-header" className="d-flex flex-row-reverse align-items-center">
            <button id="wd-quizzes-detail-editor-options-btn" className="float-end btn rounded-1 btn-md btn-secondary">
                    <IoEllipsisVertical className="fs-5"/>
                </button>
                {published ? <span className="float-end mx-4 fs-4 justify-content-between"><GreenCheckmark/>Published</span> : 
                <span className="float-end text-secondary fs-4 mx-4 d-flex align-items-center justify-content-between"><AiOutlineStop/>Not Published</span>}
                <span className="fs-4 float-end">Points {quizPoints}</span>
            </div>
            <div id="wd-quiz-detail-editor-body">
                <hr/>

            </div>
        </div>
    );
}

