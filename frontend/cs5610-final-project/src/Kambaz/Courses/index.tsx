import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizDetailsEditor from "./Quizzes/DetailsEditor";
import { useSelector } from "react-redux";
import FacultyFeatures from "../Account/FacultyFeatures";
import PreviewQuiz from "./Quizzes/PreviewQuiz";
import TakeQuiz from "./Quizzes/TakeQuiz";
import Session from "../Account/Session";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const course = courses.find((course: { _id: string | undefined; }) => course._id === cid);
    return (
        <Session>
            <div id="wd-courses">
                <h2 className="text-danger">
                    <FaAlignJustify className="me-4 fs-4 mb-1" />
                    {course && course.name} &gt; {pathname.split("/")[4]}
                </h2>
                <hr />
                <div className="d-flex">
                    <div className="d-none d-md-block">
                        <CourseNavigation />
                    </div>
                    <div className="flex-fill">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<FacultyFeatures><AssignmentEditor /></FacultyFeatures>} />
                            <Route path="People" element={<PeopleTable />} />
                            <Route path="Quizzes" element={<Quizzes />} />
                            <Route path="Quizzes/:qid" element={<FacultyFeatures><QuizDetails /></FacultyFeatures>} />
                            <Route path="Quizzes/:qid/Editor/*" element={<FacultyFeatures><QuizDetailsEditor /></FacultyFeatures>} />
                            <Route path="Quizzes/:qid/Preview" element={<FacultyFeatures><PreviewQuiz /></FacultyFeatures>} />
                            <Route path="Quizzes/:qid/Take" element={<TakeQuiz />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </Session>);
}
