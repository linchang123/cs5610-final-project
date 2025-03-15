import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import coursesReducer from "./Dashboard/coursesReducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Dashboard/enrollmentsReducer";
import quizzesReducer from "./Courses/Quizzes/reducers/reducer";
import questionsReducer from "./Courses/Quizzes/reducers/questionsReducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    coursesReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    questionsReducer
  },
});

export default store;