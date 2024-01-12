import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_UPDATE_PASSWORD, API_UPDATE_PROFILE } from 'src/common/constants';
import client from 'src/common/client';

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async ({ data, id }, { rejectWithValue }) => {
    // Call API checkLogin
    const submitData = data;
    return await client
      .put(API_UPDATE_PASSWORD.replace('{id}', id), submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const changeProfile = createAsyncThunk(
  'settings/changeProfile',
  async ({ id, data }, { rejectWithValue }) => {
    // Call API checkLogin
    const submitData = data;
    return await client
      .put(API_UPDATE_PROFILE.replace('{id}', id), submitData)
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);
