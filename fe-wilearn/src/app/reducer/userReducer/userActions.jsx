import { createAsyncThunk } from "@reduxjs/toolkit";
// import { API_GET_USER_INFO, API_GOOGLE_SIGNIN_URL, API_SIGNIN_URL, API_SIGNUP_URL } from 'src/constants';
import {
  API_GET_USER_INFO,
  API_GOOGLE_SIGNIN_URL,
  API_SIGNIN_URL,
  API_SIGNUP_URL,
  API_UPDATE_PROFILE,
  API_UPDATE_PASSWORD,
  API_YOUR_MEETINGS,
} from "../../../constants";
import { toast } from "react-toastify";
import axiosClient from "../../../services/axiosClient";
import { setLoginError } from ".";
// import { API_SIGNIN_URL } from '../../../constants';

export const checkLogin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, dispatch }) => {
    const submitData = data;
    return await axiosClient
      .post(API_SIGNIN_URL, submitData)
      .then((response) => response)
      .catch((error) => {
        dispatch(setLoginError("Tên đăng nhập hoặc mật khẩu không chính xác")); // Dispatch action lỗi
        return rejectWithValue(error.response.data);
      });
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

export const getUsermMeetings = createAsyncThunk(
  "auth/getUsermMeetings",
  async (_, { rejectWithValue }) => {
    return await axiosClient
      .get(API_YOUR_MEETINGS)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
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
    const form = new FormData();
    // form.append("Id", data.Id);
    form.append("FullName", data.FullName);
    form.append("Phone", data.Phone);
    form.append("DateOfBirth", data.DateOfBirth);
    form.append("Career", data.Career);
    form.append("Image", "");
    return await axiosClient
      .put(API_UPDATE_PROFILE.replace("{id}", submitData.Id), form)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    const submitData = data;
    console.log("submited", submitData);
    return await axiosClient
      .put(API_UPDATE_PASSWORD.replace("{id}", submitData.id), data)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
