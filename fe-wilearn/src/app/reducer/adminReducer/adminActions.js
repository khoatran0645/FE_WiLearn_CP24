import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axiosClient";
import { API_GET_NEW_REPORTS, API_GET_REPORTS, API_RESOLVED_REPORTS } from "../../../constants";

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
      .get(API_RESOLVED_REPORTS.replace("{id}", values.id)).replace("{isAppoved}", values.isAppoved)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);