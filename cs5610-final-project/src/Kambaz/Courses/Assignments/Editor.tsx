import { FormGroup, FormLabel, FormControl, FormSelect, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AssignmentEditor() {
    const { cid = "", aid = "" } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    for (const a of assignments) {
        if (a.course === cid && a._id === aid) {
            {/** Updating an existing course, feeding Editor component existing information */}
            return (
                <Editor
                    courseId={cid}
                    assignmentId={aid}
                    assignmentTitle={a.title} 
                    assignmentAvailable={a.availableFromDate} 
                    assignmentDue={a.dueDate}
                    assignmentURL={"/Kambaz/Courses/" + cid + "/Assignments/"}
                    assignmentTilDate={a.availableTilDate}
                    assignmentDetails={a.description}
                    assignmentPoints={a.points}
                    newAssignment={false}
                      />
            );
        } 
    }
    {/** Creating a new course, feeding Edirot component with default info */}
    return (<Editor 
        courseId={cid}
        assignmentId={aid}
        assignmentTitle={""} 
        assignmentAvailable={""} 
        assignmentDue={""}
        assignmentTilDate={""}
        assignmentURL={"/Kambaz/Courses/" + cid + "/Assignments/"}
        assignmentDetails={""}
        assignmentPoints={100}
        newAssignment={true} />);
    
}

const Editor = ( {
    courseId,
    assignmentId,
    assignmentTitle, 
    assignmentAvailable,
    assignmentDue, 
    assignmentTilDate, 
    assignmentURL, 
    assignmentDetails, 
    assignmentPoints, 
    newAssignment}: {
    courseId: string;
    assignmentId: string;
    assignmentTitle: string;
    assignmentAvailable:string;
    assignmentDue: string;
    assignmentTilDate: string;
    assignmentURL: string;
    assignmentDetails: string;
    assignmentPoints: number;
    newAssignment: boolean;
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [assignmentData, setAssignmentData] = useState(() => ({
        _id: assignmentId, title: assignmentTitle, course: courseId,
        availableFromDate: assignmentAvailable, dueDate: assignmentDue,
        availableTilDate: assignmentTilDate, description: assignmentDetails, points: assignmentPoints}));
    const handleSave = () => {
        if (newAssignment) {
            dispatch(addAssignment(assignmentData));
        } else {
            dispatch(updateAssignment(assignmentData));
        }
        navigate(assignmentURL);
    }
    return (
      <div id="wd-assignments-editor" className="ms-5">
        <FormGroup>
            <FormLabel>Assignment Name</FormLabel>
            <FormControl className="w-75 form-control" id="wd-name" value={assignmentData.title} onChange={(e) => setAssignmentData({...assignmentData, title: e.target.value})}/>
            <FormControl className="my-3 w-75 form-control" as="textarea" id="wd-description" value={assignmentData.description} onChange={(e) => setAssignmentData({...assignmentData, description: e.target.value})} rows={5} />
        </FormGroup>
        <Row>
            <Col xs={3} className="text-end"><label htmlFor="wd-points">Points</label></Col>
            <Col xs={9}><input style={{width: "67%"}} type="number" id="wd-points" value={assignmentData.points} onChange={(e) => setAssignmentData({...assignmentData, points: parseInt(e.target.value)})} className="form-control"/></Col>
        </Row>
        <Row className="mt-3">
            <Col xs={3} className="text-end"><label htmlFor="wd-group">Assignment Group</label></Col>
            <Col xs={9} >
                <FormSelect className="form-control" id="wd-group" style={{width: "67%"}}>
                    <option value="QUIZZES">QUIZZES</option>
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="EXAMS">EXAMS</option>
                    <option value="PROJECT">PROJECT</option>
                </FormSelect>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col xs={3} className="text-end"><label htmlFor="wd-display-grade-as">Display Grade as</label></Col>
            <Col xs={9} >
                <FormSelect className="form-control" id="wd-display-grade-as" style={{width: "67%"}}>
                    <option value="No Selection">No Selection</option>
                    <option selected value="Percentage">Percentage</option>
                </FormSelect>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col xs={3} className="text-end"><label htmlFor="wd-submission-type">Submission Type</label></Col>
            <Col xs={9} className="border border-dark border-opacity-25 rounded" style={{width: "50%"}}>
                <FormSelect id="wd-submission-type" className="position-relative form-control" style={{top: "8px"}}>
                    <option value="No Selection">No Selection</option>
                    <option selected value="Online">Online</option>
                </FormSelect>
                <fieldset className="row my-3">
                        <legend className="col-form-label fw-bold">Online Entry Options</legend>
                        <div className="col-sm-10">
                            <div className="form-check my-2">
                                <input className="form-check-input form-control me-2" type="checkbox"
                                    name="checkbox-entry-options" id="wd-text-entry" value="option1"/>
                                <label className="form-check-label" htmlFor="wd-text-entry"> Text Entry </label> 
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input form-control me-2" type="checkbox"
                                    name="checkbox-entry-options" id="wd-website-url" value="option2" checked />
                                <label className="form-check-label" htmlFor="wd-website-url"> Website URL </label> 
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input form-control me-2" type="checkbox"
                                    name="checkbox-entry-options" id="wd-media-recordings" value="option3" />
                                <label className="form-check-label" htmlFor="wd-media-recordings"> Media Recordings </label> 
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input form-control me-2" type="checkbox"
                                    name="checkbox-entry-options" id="wd-student-annotation" value="option4" />
                                <label className="form-check-label" htmlFor="wd-student-annotation"> Student Annotation </label> 
                            </div>
                            <div className="form-check my-2">
                                <input className="form-check-input form-control me-2" type="checkbox"
                                    name="checkbox-entry-options" id="wd-file-upload" value="option5" />
                                <label className="form-check-label" htmlFor="wd-file-upload"> File Uploads </label> 
                            </div>
                        </div>
                </fieldset>
            </Col>
        </Row>
        <Row className="mt-3 mb-5">
            <Col xs={3} className="text-end"><label>Assign</label></Col>
            <Col xs={9} className="border border-dark border-opacity-25 rounded" style={{width: "50%"}}>
                <label className="pt-3" htmlFor="wd-assign-to">Assign to</label>
                <FormSelect id="wd-assign-to" className="position-relative form-control" style={{top: "8px"}}>
                    <option value="No Selection">No Selection</option>
                    <option selected value="Everyone">Everyone</option>
                </FormSelect>
                <label className="pt-4" htmlFor="wd-due-date">Due</label><br/>
                <input type="date" className="w-100 rounded form-control" value={assignmentData.dueDate} onChange={(e) => setAssignmentData({...assignmentData, dueDate: e.target.value})} id="wd-due-date"/><br/>
                <div className="my-3">
                    <Row>
                        <Col>
                            <label htmlFor="wd-available-from">Available From</label>
                        </Col>
                        <Col>
                            <label htmlFor="wd-available-until">Until</label>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <input className="w-100 rounded form-control" type="date" value={assignmentData.availableFromDate} onChange={(e) => setAssignmentData({...assignmentData, availableFromDate: e.target.value})} id="wd-available-from"/>
                        </Col>
                        <Col>
                            <input className="w-100 rounded form-control" type="date" value={assignmentData.availableTilDate} onChange={(e) => setAssignmentData({...assignmentData, availableTilDate: e.target.value})} id="wd-available-until"/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <hr/>
        <div className="mt-3 text-end" style={{width: "76%"}}>
            <button onClick={() => {navigate(assignmentURL)}} className="btn btn-lg btn-secondary me-2">Cancel</button>
            <button onClick={handleSave} className="btn btn-lg btn-danger">Save</button>
        </div>
    </div>
);
}