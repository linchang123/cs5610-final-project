import { Link } from "react-router-dom";
import {Row, Col, Card} from "react-bootstrap";
import * as db from "../Database";

export default function Dashboard() {
    const courses = db.courses;
    return (
        <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
          <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
          <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
              {courses.map((course) => (
                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <Link to={`/Kambaz/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark" >
                      <img src="/images/reactJS.png" width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                        <button className="btn btn-primary"> Go </button>
                      </div>
                    </Link>
                  </Card>
                </Col>
                ))}
            </ Row>
          </div>
      </div>);
}

