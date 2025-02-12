import { FaPlus } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function AssignmentsControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>
      <div className="position-relative border rounded w-25 h-100 fs-4" style={{ top: "5px"}}>
        <FaMagnifyingGlass className="mx-2"/>
        <input placeholder="Search for Assignments" id="wd-search-assignment" className="border-0 fs-5" style={{width: "80%"}}/>
      </div>
    </div>
);}
