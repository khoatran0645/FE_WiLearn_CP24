import { createAsyncThunk } from '@reduxjs/toolkit';
import client from 'src/common/client';
import {
  API_END_REVIEW,
  API_GET_REVIEW_INFO,
  API_START_REVIEW,
  API_VOTE
} from 'src/common/constants';

export const getReviewInfos = createAsyncThunk(
  'votes/getReviewInfos',
  async (meetingId, { rejectWithValue }) => {
    // console.log('getReviewInfos', meetingId);
    return await client
      .get(API_GET_REVIEW_INFO.replace('{meetingId}', meetingId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const startReview = createAsyncThunk(
  'votes/startReview',
  async (meetingId, { rejectWithValue }) => {
    return await client
      .get(API_START_REVIEW.replace('{meetingId}', meetingId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const endReview = createAsyncThunk(
  'votes/endReview',
  async (meetingId, { rejectWithValue }) => {
    return await client
      .get(API_END_REVIEW.replace('{meetingId}', meetingId))
      .then((response) => response)
      .catch((error) => rejectWithValue(error.response.data));
  }
);

export const vote = createAsyncThunk('votes/vote', async (data, { rejectWithValue }) => {
  // console.log({ data });
  return await client
    .post(API_VOTE, data)
    .then((response) => response)
    .catch((error) => rejectWithValue(error.response.data));
});
