import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
// import logger from 'redux-logger';

 const store = configureStore({
    reducer: {
        user: userReducer
        // Your reducers here
    },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

});

export default store;