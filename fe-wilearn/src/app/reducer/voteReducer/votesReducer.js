import { createSlice } from '@reduxjs/toolkit';
import { getReviewInfos, startReview, endReview, vote } from './votesActions';

const initialState = {
  loading: false,
  error: null,
  votesData: []
};

const voteSlice = createSlice({
  name: 'votes',
  initialState,
  reducers: {
    clearVoteData: (state) => {
      state.votesData = [];
    }
  },
  extraReducers: (builder) => {
    // Define reducers for asynchronous actions

    // Reducers for getReviewInfos action
    // [getReviewInfos.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getReviewInfos.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    // [getReviewInfos.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.votesData = payload;
    // },
    builder.addCase(getReviewInfos.fulfilled ,(state, { payload }) => {
        state.loading = false;
        state.votesData = payload;
    })
    // [getReviewInfos.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // }
    builder.addCase(getReviewInfos.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
    })
  }
});

export const { clearVoteData } = voteSlice.actions;

export { getReviewInfos, startReview, endReview, vote }; // export asynchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default voteSlice.reducer;
