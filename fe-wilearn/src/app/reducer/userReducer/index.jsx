import { createSlice } from '@reduxjs/toolkit';
import { checkLogin, checkLoginGoogle, getUserInfo, register } from './userActions'; 

const initialState = {
  loading: false,
  userInfo: null,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define reducers for synchronous actions

    reset: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    // Define reducers for asynchronous actions

    // // Reducers for register action
    // [register.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [register.fulfilled]: (state) => {
    //   state.loading = false;
    // },
    // [register.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // Reducers for requestLogin action
    // [checkLogin.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(checkLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    // [checkLogin.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    //   localStorage.setItem('token', payload.token);
    //   localStorage.setItem('role', payload.role);
    // },
    builder.addCase(checkLogin.fulfilled,(state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      localStorage.setItem('token', payload.token);
      localStorage.setItem('role', payload.role);
    })
    // [checkLogin.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
    builder.addCase(checkLogin.rejected,(state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // //Reducers for requestGoogleLogin action
    // [checkLoginGoogle.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [checkLoginGoogle.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    //   localStorage.setItem('token', payload.token);
    //   localStorage.setItem('role', payload.role);
    //   console.log('payload.role', payload.role)
    //   console.log('payload', payload)
    // },
    // [checkLoginGoogle.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },

    // Reducers for getUserInfo action
    // [getUserInfo.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    builder.addCase(getUserInfo.pending,(state) => {
      state.loading = true;
      state.error = null;
    });
    // [getUserInfo.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    // },
    builder.addCase(getUserInfo.fulfilled,(state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    });
    // [getUserInfo.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // }
    builder.addCase(getUserInfo.rejected,(state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  }
});

export { checkLogin, register, getUserInfo }; // export asynchronous actions

export const { reset } = userSlice.actions; // export synchronous actions

// export reducer
// reducer need to be registered with a state name at src/store/rootReducers.js
export default userSlice.reducer;
