import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import QuestionEditor from "./QuestionEditor";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, editQuestion, updateQuestion, addQuestion } from "./reducers/questionsReducer";

export default function QuestionsEditorTab() {
    const {cid, qid} = useParams();
    const {questions} = useSelector((state: any) => state.questionsReducer);
    const dispatch = useDispatch();
    const handleDeleteButtonClick = () => {dispatch(deleteQuestion(qid))};
    const handleNewQuestionButtonClick = () => {
        const newQuestion = {_id: uuidv4(), course: cid, quiz: qid, title:"New Question", points: 0, questionType: "Multiple Choice", prompt: "",
                             possibleAnswers: [], acceptedAnswers:[], editing: true}
        dispatch(addQuestion(newQuestion));
    }
    return (
        <div className="text-center d-flex flex-column align-items-center">
            <ul id="wd-quiz-questions-list" className="list-group rounded-0 w-75 mt-4">
            {questions.filter((question: any) => question.course === cid && question.quiz === qid)
            .map((question: any, index: number) => (
                question.editing ? 
                <QuestionEditor question={question}/>
                : (<li key={question._id} className="list-group-item m-2 border border-secondary p-0">
                        <div className="wd-quiz-question-header fs-5 fw-bolder text-start bg-secondary p-2 w-100">
                        <span className="m-2">Question {index + 1}</span>
                        <span className="ms-3">({question.questionPoints} pts)</span>
                        <div className="wd-quiz-question-control-buttons float-end">
                            <FaPencil className="text-primary me-3" onClick={() => {dispatch(editQuestion(question._id))}}/>
                            <FaTrash className="text-danger me-2 mb-1" />
                        </div>
                        </div>
                        <p className="bg-white text-start m-3">{question.prompt}</p>
                  </li>
                  )
            ))}
            </ul>
            <button className="btn btn-secondary mt-5 mb-3" style={{width: "15%", minWidth: "150px"}} onClick={handleNewQuestionButtonClick}>
                <FaPlus className="fs-6 me-1 position-relative" style={{bottom: "1px"}}/> New Question
            </button>
        </div>
    );
}