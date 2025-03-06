import QuestionEditor from "./QuestionEditor";

export default function QuestionsEditorTab() {
    return (
        <div className="text-center d-flex flex-column align-items-center">
        {/* TODO: get the list of questions for the current quiz */}
            <button className="btn btn-secondary my-3" style={{width: "15%", minWidth: "150px"}}>+ New Question</button>
            <QuestionEditor/>
        </div>
    );
}