import { FormGroup, FormLabel, FormControl, FormSelect, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router";
import assignmentProps from "./AssignmentProps";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignments = db.assignments;
    for (const a of assignments) {
        if (a.course === cid && a._id === aid) {
            return (
                <Editor assignmentTitle={a.title} 
                      assignmentAvailable={a.availableDate} 
                      assignmentDue={a.dueDate}
                      assignmentURL={"/Kambaz/Courses/" + cid + "/Assignments/"}
                      assignmentDetails=""
                      assignmentPoints={100}/>
            );
        }
      }
    
    }

const Editor = ({assignmentTitle, assignmentAvailable,
    assignmentDue, assignmentURL}: assignmentProps) => {
    var textAreaText = "The assignment is available online.\nSubmit a link to the landing page of your Web application running on Netlify.";
    return (
      <div id="wd-assignments-editor" className="ms-5">
        <FormGroup>
            <FormLabel>Assignment Name</FormLabel>
            <FormControl className="w-75 form-control" id="wd-name" value={assignmentTitle}/>
            <FormControl className="my-3 w-75 form-control" as="textarea" id="wd-description" value={textAreaText} rows={5} />
        </FormGroup>
        <Row>
            <Col xs={3} className="text-end"><label htmlFor="wd-points">Points</label></Col>
            <Col xs={9}><input style={{width: "67%"}} id="wd-points" value={100} className="form-control"/></Col>
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
                <input type="date" className="w-100 rounded form-control" value={assignmentDue} id="wd-due-date"/><br/>
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
                            <input className="w-100 rounded form-control" type="date" value={assignmentAvailable} id="wd-available-from"/>
                        </Col>
                        <Col>
                            <input className="w-100 rounded form-control" type="date" value={assignmentDue} id="wd-available-until"/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
        <hr/>
        <div className="mt-3 text-end" style={{width: "76%"}}>
            <Link to={assignmentURL} className="btn btn-lg btn-secondary me-2">Cancel</Link>
            <Link to={assignmentURL} className="btn btn-lg btn-danger">Save</Link>
        </div>
    </div>
);
}