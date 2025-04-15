import { IoMdArrowDropdown } from "react-icons/io";
import { Row, Col, Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "../utility/GreenCheckMark";
import formatDate from "../utility/formatDate";
import { useNavigate, useParams } from "react-router";
import { RxRocket } from "react-icons/rx";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import FacultyFeatures from "../../Account/FacultyFeatures";
import { useState, useEffect } from "react";
import { v4 as uuidv } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineStop } from "react-icons/ai";
import { deleteQuiz, publishQuiz, fetchQuizzes } from "./reducers/reducer";
import "../../styles.css";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch<any>();
  const { quizzes, loading, error } = useSelector(
    (state: any) => state.quizzesReducer
  );
  const [quizId, setQuizId] = useState(uuidv());
  const navigate = useNavigate();

  // On component mount or when id changes, fetch quizzes from the backend.
  useEffect(() => {
    if (cid) {
      dispatch(fetchQuizzes(cid));
    }
  }, [cid, dispatch]);

  const handleButtonClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Editor`);
    setTimeout(() => setQuizId(uuidv4()), 500);
  };

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="wd-quiz">
      <div className="text-nowrap py-3">
        <FacultyFeatures>
          <button
            id="wd-quizzes-option-btn"
            className="btn rounded-1 btn-lg btn-secondary float-end"
          >
            <IoEllipsisVertical className="fs-5" />
          </button>
          <button
            id="wd-add-quiz-btn"
            className="btn btn-lg rounded-1 btn-danger me-1 float-end"
            onClick={handleButtonClick}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>
        </FacultyFeatures>
        <div
          className="position-relative border rounded-1 w-25 h-100 fs-4"
          style={{ top: "5px" }}
        >
          <FaMagnifyingGlass className="mx-2" />
          <input
            placeholder="Search for Quiz"
            id="wd-search-quiz"
            className="border-0 fs-5"
            style={{ width: "80%" }}
          />
        </div>
      </div>
      <hr />
      <QuizList quizzes={quizzes} cid={cid ? cid : ""} />
    </div>
  );
}

const QuizList = ({ quizzes, cid }: { quizzes: any; cid: string }) => {
  let currCourseQuiz = [];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Update filter to use "courseId" instead of "course"
  // Note please check schemas to match field names
  if (currentUser.role === "FACULTY") {
    currCourseQuiz = quizzes.filter((quiz: any) => quiz.courseId === cid);
  } else {
    currCourseQuiz = quizzes.filter(
      (quiz: any) => quiz.courseId === cid && quiz.published === true
    );
  }
  if (currCourseQuiz.length > 0) {
    return (
      <div id="wd-quiz-list">
        <div
          id="wd-quizzes-title"
          className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-4"
        >
          <IoMdArrowDropdown className="me-2 fs-3" />
          Assignment Quizzes
        </div>
        <ul id="wd-quiz-list" className="list-group rounded-0">
          {currCourseQuiz.map((quiz: any) => (
            <Quiz
              key={quiz._id}
              quizTitle={quiz.title}
              quizDue={formatDate(quiz.dueDate)}
              quizURL={"#/Kambaz/Courses/" + cid + "/Quizzes/" + quiz._id}
              published={quiz.published}
              quizId={quiz._id}
              // Updated property names to match backend schema
              quizAvailableFrom={quiz.availableDate}
              quizAvailableTil={quiz.untilDate}
              courseId={cid}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <FacultyFeatures>
        <h3 className="text-center text-secondary">
          Click on "+ Quiz" button to add new quiz
        </h3>
      </FacultyFeatures>
    );
  }
};

const Quiz = ({
  quizTitle,
  quizDue,
  quizURL,
  published,
  quizId,
  quizAvailableFrom,
  quizAvailableTil,
  courseId,
}: {
  quizTitle: string;
  quizDue: string;
  quizURL: string;
  published: boolean;
  quizId: string;
  quizAvailableFrom: string;
  quizAvailableTil: string;
  courseId: string;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePublishSymbolClick = () => {
    dispatch(publishQuiz(quizId));
  };
  const handleDeleteButtonClick = () => {
    dispatch(deleteQuiz(quizId));
  };
  const handleEditButtonClick = () => {
    navigate(`${quizId}`);
  };
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Update filtering: use q.quizId to get questions associated with this quiz
  const questionsInQuiz = questions.filter((q: any) => q.quizId === quizId);
  const quizPoints = questionsInQuiz.reduce(
    (sum: any, q: { points: any }) => sum + q.points,
    0
  );
  return (
    <li className="wd-quiz-list-item list-group-item p-3 ps-1 d-flex align-items-center">
      <RxRocket className="m-2 fs-3" style={{ minWidth: "30px" }} />
      <div className="ms-2" style={{ width: "90%" }}>
        <a
          href={quizURL}
          className="wd-quiz-link fw-bold text-black text-decoration-none fs-5"
        >
          {quizTitle}
        </a>
        <p className="m-0">
          <span className="me-1">
            <QuizAvailability
              quizAvailableFrom={quizAvailableFrom}
              quizAvailableTil={quizAvailableTil}
            />
          </span>{" "}
          | <span className="fw-bold mx-1">Due</span> {quizDue} | {quizPoints}{" "}
          pts | {questionsInQuiz.length} questions
          {currentUser.role === "STUDENT" ? "| Score 0pt" : ""}
        </p>
        {currentUser.role === "STUDENT" && published && (
          <div className="mt-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                navigate(`/Kambaz/Courses/${courseId}/Quizzes/${quizId}/Take`)
              }
            >
              Take Quiz
            </button>
          </div>
        )}
      </div>
      <FacultyFeatures>
        <div
          className="d-flex align-items-center ms-3"
          style={{ minWidth: "120px" }}
        >
          <Row>
            <Col>
              <span onClick={handlePublishSymbolClick}>
                {published ? (
                  <GreenCheckMark />
                ) : (
                  <AiOutlineStop className="fs-2" />
                )}
              </span>
            </Col>
            <Col>
              <Dropdown className="float-end me-2">
                <Dropdown.Toggle id="wd-quiz-context-menu-btn" bsPrefix="btn">
                  <IoEllipsisVertical className="fs-4" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={handleEditButtonClick}
                    id="wd-quiz-menu-edit-option"
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="wd-quiz-menu-delete-option"
                    onClick={handleDeleteButtonClick}
                  >
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handlePublishSymbolClick}
                    id="wd-quiz-menu-publish-option"
                  >
                    {published ? "Unpublish" : "Publish"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </div>
      </FacultyFeatures>
    </li>
  );
};

const QuizAvailability = ({
  quizAvailableFrom,
  quizAvailableTil,
}: {
  quizAvailableFrom: string;
  quizAvailableTil: string;
}) => {
  const availableFrom = new Date(quizAvailableFrom);
  const availableTil = new Date(quizAvailableTil);
  const currDate = new Date();
  if (availableTil < currDate) {
    return <strong>Closed</strong>;
  } else if (availableFrom <= currDate && currDate <= availableTil) {
    return <strong>Available</strong>;
  } else if (currDate < availableFrom) {
    return (
      <span>
        <strong>Not Available until </strong>
        {formatDate(quizAvailableFrom)}
      </span>
    );
  }
};
