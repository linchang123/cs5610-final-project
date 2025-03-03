import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
    enrollments: enrollments,
  };

const enrollmentsSlice = createSlice({
name: "enrollments",
initialState,
reducers: {
    addEnrollment: (state, {payload: enrollment}) => {
        state.enrollments = [...state.enrollments, enrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollment }) => {
    state.enrollments = state.enrollments.filter(
        (e: any) => !(e.course === enrollment.course && e.user === enrollment.user));
    },
  },
});
export const { addEnrollment, deleteEnrollment } =
enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;