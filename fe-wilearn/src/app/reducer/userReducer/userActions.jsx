import { createAsyncThunk } from "@reduxjs/toolkit";
// import { API_GET_USER_INFO, API_GOOGLE_SIGNIN_URL, API_SIGNIN_URL, API_SIGNUP_URL } from 'src/constants';
import {
  API_GET_USER_INFO,
  API_GOOGLE_SIGNIN_URL,
  API_SIGNIN_URL,
  API_SIGNUP_URL,
  API_UPDATE_PROFILE,
} from "../../../constants";
import { toast } from "react-toastify";
import axiosClient from "../../../services/axiosClient";
// import { API_SIGNIN_URL } from '../../../constants';

export const checkLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    // Call API checkLogin
    const submitData = data;
    return await axiosClient
      .post(API_SIGNIN_URL, submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const checkLoginGoogle = createAsyncThunk(
  "auth/login",
  async (access_token, { rejectWithValue }) => {
    // Call API checkLogin
    return await axiosClient
      .post(API_GOOGLE_SIGNIN_URL + `?accessToken=${access_token}`)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    // Call API checkLogin
    const submitData = data;
    return await axiosClient
      .post(API_SIGNUP_URL, submitData)
      // .then((response) => response)
      .then((response) => {
        toast.success("Đăng kí tài khoản thành công");
      })
      .catch((error) => {
        rejectWithValue(error.response.data);
        error.response.data.forEach((err) => {
          toast.error(err);
        });
        toast.error(error.response.data);
      });
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_GET_USER_INFO)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (data, { rejectWithValue }) => {
    const submitData = data;
    return await axiosClient
      .put(API_UPDATE_PROFILE, submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
