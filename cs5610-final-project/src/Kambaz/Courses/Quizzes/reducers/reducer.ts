import { createSlice } from "@reduxjs/toolkit";
import { quizzes } from "../../../Database";
const initialState = {
    quizzes: quizzes,
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, {...quiz}] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? {...quiz} : q
      ) as any;
    },
    publishQuiz: (state, {payload: quizId}) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      ) as any;
    }
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, publishQuiz } =
quizzesSlice.actions;
export default quizzesSlice.reducer;