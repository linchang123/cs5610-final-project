import { Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function QuestionEditor() {
    const questionType = ["Multiple Choice", "True/False", "Fill In the Blank"];
    return (
        <div className="w-75 border">
            <Form>
                <div className="float-end"><Form.Group className="mb-3 d-flex">
                    <Form.Label style={{width: "50px"}}>pts: </Form.Label>
                    <Form.Control style={{width: "10px"}} />
                    </Form.Group>
                </div>
                <div className="mb-3 d-flex">
                    <Form.Group controlId="formGridQuestionTitle" >
                        <Form.Control id="wd-question-title"  value="Easy Question" />
                    </Form.Group>

                    <Form.Group controlId="formGridQuestionType">
                        <FormSelect className="form-control"  as={Col} id="wd-quiz-type" onChange={() => null}>
                            {questionType.map((q) => (<option value={q}>{q}</option>))}
                        </FormSelect>
                    </Form.Group>
                    
                </div>
            </Form>
            
        </div>
    );
}