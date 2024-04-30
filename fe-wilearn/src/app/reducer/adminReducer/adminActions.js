import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axiosClient";
import { API_CREATE_SUBJECT, API_GET_NEW_REPORTS, API_GET_REPORTS, API_RESOLVED_REPORTS } from "../../../constants";

export const getReportLists = createAsyncThunk(
  "admin/getReportLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_REPORTS)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getNewReportLists = createAsyncThunk(
  "admin/getNewReportLists",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_NEW_REPORTS)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const resolveReport = createAsyncThunk(
  "admin/resolveReport",
  async (values, { rejectWithValue }) => {
    
    return await axiosClient
    .put(API_RESOLVED_REPORTS.replace("{id}", values.id).replace("{isApproved}", values.isApproved))
    .then((response) => response)
    .catch((error) => rejectWithValue(error.response.data));
  }
);

export const createSubject = createAsyncThunk(
  "admin/createSubject",
  async (name, { rejectWithValue }) => {
    return await axiosClient
      .post(API_CREATE_SUBJECT.replace("{name}", name))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);