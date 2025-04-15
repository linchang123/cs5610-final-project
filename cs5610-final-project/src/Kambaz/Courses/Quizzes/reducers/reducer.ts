import { createSlice } from "@reduxjs/toolkit";
import { fetchQuizzesForCourse } from "../client";

// Initialize state without local JSON data
const initialState = {
  quizzes: [] as any[],
  loading: false,
  error: null as string | null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, { ...quiz }] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...quiz } : q
      ) as any;
    },
    publishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      ) as any;
    },
    updateQuizTotalScore: (state, { payload: quizInfo }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizInfo._id ? { ...q, points: quizInfo.points } : q
      ) as any;
    },
    // Additional actions for handling async quiz fetching:
    getQuizzesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    getQuizzesSuccess: (state, { payload: quizzes }) => {
      state.loading = false;
      state.quizzes = quizzes;
    },
    getQuizzesError: (state, { payload: error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});
export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  publishQuiz,
  updateQuizTotalScore,
  getQuizzesPending,
  getQuizzesSuccess,
  getQuizzesError,
} = quizzesSlice.actions;

export const fetchQuizzes = (courseId: string) => {
  return async (dispatch: any) => {
    dispatch(getQuizzesPending());
    try {
      const quizzes = await fetchQuizzesForCourse(courseId);
      dispatch(getQuizzesSuccess(quizzes));
    } catch (error: any) {
      dispatch(getQuizzesError(error.message));
    }
  };
};
export default quizzesSlice.reducer;
