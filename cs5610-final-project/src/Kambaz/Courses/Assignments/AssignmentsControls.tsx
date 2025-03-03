import { FaPlus } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import FacultyFeatures from "../../Account/FacultyFeatures";

export default function AssignmentsControls(
  { assignmentId, setAssignmentId }:
  { assignmentId: string; setAssignmentId: (title: string) => void;}
) {
  const { cid } = useParams();
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
    setTimeout(() => setAssignmentId(uuidv4()), 500);
  }
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <FacultyFeatures>
        <button onClick={handleButtonClick} id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
        <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>
      </FacultyFeatures>
      <div className="position-relative border rounded w-25 h-100 fs-4" style={{ top: "5px"}}>
        <FaMagnifyingGlass className="mx-2"/>
        <input placeholder="Search for Assignments" id="wd-search-assignment" className="border-0 fs-5" style={{width: "80%"}}/>
      </div>
      
    </div>
);}