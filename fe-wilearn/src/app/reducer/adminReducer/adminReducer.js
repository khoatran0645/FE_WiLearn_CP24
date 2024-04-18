import { createSlice } from "@reduxjs/toolkit";
const initialState={
  reports:[],
  newReports:[],
}
const adminSlice=createSlice({
  name:"admin",
  reducers:{
    reset:(state)=>{
      state.reports = []
      state.newReports = []
    }
  },
  extraReducers:(builder)=>{

  }
})
export const{reset} = adminSlice.actions
export default adminSlice.reducer;