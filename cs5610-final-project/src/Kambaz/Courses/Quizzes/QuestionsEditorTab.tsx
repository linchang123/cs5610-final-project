import { FaPlus } from "react-icons/fa6";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsEditorTab() {
    return (
        <div className="text-center d-flex flex-column align-items-center">
        {/* TODO: get the list of questions for the current quiz */}
            <button className="btn btn-secondary my-3" style={{width: "15%", minWidth: "150px"}}>
                <FaPlus className="fs-6 me-1 position-relative" style={{bottom: "1px"}}/> New Question
            </button>
            <QuestionEditor/>
        </div>
    );
}