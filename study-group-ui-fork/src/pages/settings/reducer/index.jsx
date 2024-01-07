import { createSlice } from '@reduxjs/toolkit';
import { changePassword, changeProfile } from './actions';

const initialState = {
  loading: false,
  error: null
};

const settingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define reducers for synchronous actions

    reset: (state) => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: {
    // Define reducers for asynchronous actions

    // Reducers for changePassword action
    [changePassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changePassword.fulfilled]: (state) => {
      state.loading = false;
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Reducers for changeProfile action
    [changeProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changeProfile.fulfilled]: (state) => {
      state.loading = false;
    },
    [changeProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
  }
});

export { changePassword, changeProfile }; // export asynchronous actions

export const { reset } = settingSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default settingSlice.reducer;
