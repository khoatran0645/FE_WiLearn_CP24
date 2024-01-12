import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_GET_USER_INFO, API_SIGNIN_URL, API_SIGNUP_URL } from 'src/common/constants';
import client from 'src/common/client';
import { toast } from 'react-toastify';

export const checkLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  // Call API checkLogin
  const submitData = data;
  return await client
    .post(API_SIGNIN_URL, submitData)
    .then((response) => response)
    .catch((error) => rejectWithValue(error.response.data));
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  // Call API checkLogin
  const submitData = data;
  return await client
    .post(API_SIGNUP_URL, submitData)
    // .then((response) => response)
    .then((response) => {
      toast.success('Đăng kí tài khoản thành công');
    })
    .catch((error) => {
      rejectWithValue(error.response.data);
      error.response.data.forEach((err) => {
        toast.error(err);
      });
      toast.error(error.response.data);
    });
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (_, { rejectWithValue }) => {
  return await client
    .get(API_GET_USER_INFO)
    .then((response) => response)
    .catch((error) => rejectWithValue(error.response.data));
});
