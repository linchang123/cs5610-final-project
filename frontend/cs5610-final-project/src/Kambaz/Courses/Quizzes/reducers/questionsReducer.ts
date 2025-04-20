import { createSlice } from "@reduxjs/toolkit";
// import { questions } from "../../../Database";

const initialState = {
    questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
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
    editQuestion: (state, { payload: questionInfo }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === questionInfo._id ? { ...q, editing: questionInfo.edit } : q
      ) as any;
    },
  },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestions } =
questionsSlice.actions;
export default questionsSlice.reducer;