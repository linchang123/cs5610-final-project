import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen } from "react-icons/fa6";
import { Row, Col, Modal } from "react-bootstrap";
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
import AssignmentProps from "./AssignmentProps";

export default function Assignments() {
    const { cid } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
            <Assignment 
            assignment={{ ...assignment, assignmentURL:`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}}
            setSelectedAssignment={setSelectedAssignment}
            setShow={setShow}
            />
          ))}
        </ul>
        <DeleteAssignment dialogTitle="Delete Assignment" selectedAssignment={selectedAssignment} show={show} handleClose={handleClose}/>
      </div>
  );}
  
const Assignment = 
    ({ setSelectedAssignment,assignment,setShow}: {
        setSelectedAssignment: (assignment: { _id: string, title: string }) => void;
        assignment: AssignmentProps;
        setShow: (b: boolean) => void;
    }) => {
    return (
        <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
             <FacultyFeatures><BsGripVertical className="my-3 me-2 fs-3" style={{minWidth: "20px"}}/></FacultyFeatures>
             <FaFilePen className="m-3 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-3 me-4" style={{width: "80%"}}>
                 <a href={assignment.assignmentURL}
                  className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                  {assignment.title}
                 </a> 
                 <p className="m-0">
                     <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{formatDate(assignment.availableFromDate)} | 
                     <span className="fw-bold"> Due</span> {formatDate(assignment.dueDate)} | {assignment.points} pts
                 </p>

             </div>
             {/** Only render AssignmentsControl buttons if current user is a faculty */}
             <FacultyFeatures>
                <div className="ms-auto me-3" style={{minWidth: "120px"}}>
                    <Row>
                        <Col><GreenCheckmark/></Col>
                        <Col><IoEllipsisVertical className="fs-4" /></Col>
                        <Col><FaTrash data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" className="text-danger fs-4" 
                        onClick={() => {setSelectedAssignment({ _id: assignment._id, title: assignment.title }); setShow(true)}}/>
                        </Col>
                        
                    </Row>
                </div>
             </FacultyFeatures>
        </li>
    );
};

function DeleteAssignment({ dialogTitle, selectedAssignment, show, handleClose }:
    { dialogTitle: string; selectedAssignment: any; show: boolean ; handleClose: () => void;}) {
        {/** Configure Delete Assignment Modal */}
        const dispatch = useDispatch();
      return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{dialogTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure to remove {selectedAssignment.title} ?</p>
          </Modal.Body>
          <Modal.Footer>
          <button onClick={() => {dispatch(deleteAssignment(selectedAssignment._id));handleClose()}} type="button" data-bs-dismiss="modal" className="btn btn-danger">
           Yes </button>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>No</button>
          </Modal.Footer>
        </Modal>
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
