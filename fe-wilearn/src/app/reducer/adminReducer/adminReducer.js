import { createSlice } from "@reduxjs/toolkit";
import { getNewReportLists, getReportLists } from "./adminActions";
const initialState={
  loading: false,
  error: null,
  reports:[],
  newReports:[],
}
const adminSlice=createSlice({
  name:"admin",
  initialState,
  reducers:{
    reset:(state)=>{
      state.reports = []
      state.newReports = []
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(getReportLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReportLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.reports = payload;
    });
    builder.addCase(getReportLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(getNewReportLists.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getNewReportLists.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.newReports = payload;
    });
    builder.addCase(getNewReportLists.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
})
export const{reset} = adminSlice.actions
export default adminSlice.reducer;