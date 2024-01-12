import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const meetingSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Define reducers for synchronous actions

    addPeer: (state, { payload }) => {
      state[payload.peerId] = {
        stream: payload.stream
      };
    },
    removePeer: (state, { payload }) => {
      // eslint-disable-next-line no-unused-vars
      const { [payload.peerId]: deleted, ...rest } = state;
      return rest;
    }
  },
  extraReducers: {
    // Define reducers for asynchronous actions
  }
});

// export { }; // export asynchronous actions

export const { addPeer, removePeer } = meetingSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default meetingSlice.reducer;
