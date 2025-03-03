import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsControls from "./AssignmentsControls";
// import assignmentProps from "./AssignmentProps";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { useParams } from "react-router";
// import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import FacultyFeatures from "../../Account/FacultyFeatures";
import formatDate from "../utility/formatDate";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignmentId, setAssignmentId] = useState(uuidv4());
    const [selectedAssignment, setSelectedAssignment] = useState({_id: "", title: ""})
    return (
      <div id="wd-assignments">
        <div className="text-nowrap">
            <AssignmentsControls assignmentId={assignmentId} setAssignmentId={setAssignmentId}/>
        </div>
        <div id="wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-5">
            {/** Only render AssignmentsControl buttons if current user is a faculty */}
            <FacultyFeatures><BsGripVertical className="me-2 fs-3" /></FacultyFeatures>
            <IoMdArrowDropdown className="me-2 fs-3"/>
            ASSIGNMENTS
            <FacultyFeatures><AssignmentsControlButtons/></FacultyFeatures>
        </div>
        <ul id="wd-assignment-list" className="list-group rounded-0" style={{minWidth: 0}}>
          {/** Only render Assignments in the current course which the current user is enrolled in */}
          {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <Assignment assignmentTitle={assignment.title} assignmentId={assignment._id}
            assignmentAvailable={formatDate(assignment.availableFromDate) + " at 12:00am"} 
            assignmentDue={formatDate(assignment.dueDate) + " at 11:59pm"}
            assignmentURL={"#/Kambaz/Courses/" + cid + "/Assignments/" + assignment._id}
            assignmentPoints={assignment.points}
            assignmentTilDate={assignment.availableTilDate}
            courseId={assignment.courseId}
            assignmentDetails={assignment.description}
            setSelectedAssignment={setSelectedAssignment}
            />
          ))}
        </ul>
        <DeleteAssignment dialogTitle="Delete Assignment" selectedAssignment={selectedAssignment}/>
      </div>
  );}
  
const Assignment = 
    ({assignmentTitle, assignmentAvailable,assignmentDue, assignmentURL, assignmentPoints, setSelectedAssignment, assignmentId}: {
        assignmentTitle: string;
        assignmentAvailable:string;
        assignmentDue: string;
        assignmentURL: string;
        assignmentPoints: number;
        assignmentTilDate: string;
        courseId: string;
        assignmentDetails: string
        setSelectedAssignment: (assignment: { _id: string, title: string }) => void;
        assignmentId: string;
    }) => {
    return (
        <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
             <FacultyFeatures><BsGripVertical className="my-3 me-2 fs-3" style={{minWidth: "20px"}}/></FacultyFeatures>
             <FaFilePen className="m-3 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-3" style={{width: "80%"}}>
                 <a href={assignmentURL}
                  className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                  {assignmentTitle}
                 </a> 
                 <p className="m-0">
                     <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{assignmentAvailable} | 
                     <FacultyFeatures><br/></FacultyFeatures>
                     <span className="fw-bold"> Due</span> {assignmentDue} | {assignmentPoints} pts
                 </p>

             </div>
             {/** Only render AssignmentsControl buttons if current user is a faculty */}
             <FacultyFeatures>
                <div className="d-flex align-items-center ms-3" style={{minWidth: "120px"}}>
                    <Row>
                        <Col><GreenCheckmark/></Col>
                        <Col><IoEllipsisVertical className="fs-4" /></Col>
                        <Col><FaTrash data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" className="text-danger fs-4" 
                        onClick={() => setSelectedAssignment({ _id: assignmentId, title: assignmentTitle })}/>
                        </Col>
                        
                    </Row>
                </div>
             </FacultyFeatures>
        </li>
    );
};

function DeleteAssignment({ dialogTitle, selectedAssignment }:
    { dialogTitle: string; selectedAssignment: any; }) {
        {/** Configure Delete Assignment Modal */}
        const dispatch = useDispatch();
      return (
        <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
              </div>
              <div className="modal-body">
                <p>Are you sure to remove {selectedAssignment.title} ?</p>
              </div>
              <div className="modal-footer">
              <button onClick={() => {dispatch(deleteAssignment(selectedAssignment._id));}} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              Yes </button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  No </button>
              </div>
            </div>
          </div>
        </div>
      );

}

function GreenCheckmark() {
  return (
    <span className="me-1">
      <FaCheckCircle
        className="text-success me-1 position-absolute fs-2" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}
