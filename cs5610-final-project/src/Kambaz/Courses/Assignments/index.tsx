import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import assignmentProps from "./AssignmentProps";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../utility/GreenCheckMark";
import formatDate from "../utility/formatDate";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;

    return (
      <div id="wd-assignments">
        <div className="text-nowrap">
            <AssignmentsControls/>
        </div>
        <div id="wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-5">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3"/>
            ASSIGNMENTS
            <AssignmentsControlButtons/>
        </div>
        <ul id="wd-assignment-list" className="list-group rounded-0">
          {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <Assignment assignmentTitle={assignment.title} 
            assignmentAvailable={formatDate(assignment.availableDate) + "at 12:00am"} 
            assignmentDue={formatDate(assignment.dueDate) + " at 11:59pm"}
            assignmentURL={"#/Kambaz/Courses/" + cid + "/Assignments/" + assignment._id}
            assignmentDetails=""
            assignmentPoints={100}/>
          ))}
        </ul>
      </div>
  );}
  
const Assignment = ({assignmentTitle, assignmentAvailable,
    assignmentDue, assignmentURL}: assignmentProps) => {
    return (
        <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
             <BsGripVertical className="my-3 me-2 fs-3" style={{minWidth: "30px"}}/>
             <FaFilePen className="my-3 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-3" style={{width: "90%"}}>
                 <a href={assignmentURL}
                  className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                  {assignmentTitle}
                 </a> 
                 <p className="m-0">
                     <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{assignmentAvailable} | <br/>
                     <span className="fw-bold">Due</span> {assignmentDue} | 100pts
                 </p>

             </div>
             <div className="d-flex align-items-center ms-3" style={{minWidth: "68px"}}>
                 <Row>
                     <Col><GreenCheckMark/></Col>
                     <Col><IoEllipsisVertical className="fs-4" /></Col>
                 </Row>
             </div>
        </li>
    );
};

