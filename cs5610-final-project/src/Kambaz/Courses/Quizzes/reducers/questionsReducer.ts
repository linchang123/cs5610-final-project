import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../../Database";
const initialState = {
    questions: questions,
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: (state, { payload: question }) => {
      state.questions = [...state.questions, {...question}] as any;
    },
    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== questionId);
    },
    updateQuestion: (state, { payload: question }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === question._id ? {...question} : q
      ) as any;
    },
    editQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === questionId ? { ...q, editing: true } : q
      ) as any;
    },
  },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion } =
questionsSlice.actions;
export default questionsSlice.reducer;