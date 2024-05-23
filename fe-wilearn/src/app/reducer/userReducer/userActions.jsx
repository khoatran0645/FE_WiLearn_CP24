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
  API_FORGOT_PASSWORD,
  API_GET_PERSONAL_STATS,
  API_GET_MORE_PERSONAL_STATS,
  API_GOOGLE_SIGNIN_JWT_URL,
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
        // console.log(error.request.status);
        if (error.request.status === 400) {
          dispatch(setLoginError("Tài khoản đã bị vô hiệu"));
        } else {
          dispatch(
            setLoginError("Tên đăng nhập hoặc mật khẩu không chính xác")
          ); // Dispatch action lỗi
        }

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

export const checkLoginGoogleJWT = createAsyncThunk(
  "auth/login",
  async (access_token, { rejectWithValue }) => {
    // Call API checkLogin
    return await axiosClient
      .post(API_GOOGLE_SIGNIN_JWT_URL + `?idToken=${access_token}`)
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
        // toast.success("Đăng ký thành công! Vui lòng đăng nhập vào tài khoản của bạn.");
        toast.success("Register successfully! Please sign into your account.");
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email, { rejectWithValue }) => {
    const submitData = email;
    return await axiosClient
      .get(
        API_FORGOT_PASSWORD.replace("{email}", encodeURIComponent(submitData))
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getPersonalStatistics = createAsyncThunk(
  "auth/getPersonalStatistics",
  async (data, { rejectWithValue }) => {
    const submitData = data;
    // console.log("getPersonalStatistics", submitData);
    return await axiosClient
      .get(
        API_GET_PERSONAL_STATS.replace("{userId}", submitData.userId).replace(
          "{time}",
          submitData.time
        )
      )
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const getMoreUserStats = createAsyncThunk(
  "auth/getMoreUserStats",
  async (data, { rejectWithValue }) => {
    const submitData = data;
    // console.log("getMoreUserStats", submitData);
    return await axiosClient
      .get(API_GET_MORE_PERSONAL_STATS.replace("{userId}", submitData))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
