import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import studyGroupReducer from "./reducer/studyGroupReducer";
// import logger from 'redux-logger';

 const store = configureStore({
    reducer: {
        // Your reducers here
        user: userReducer,
        studyGroup: studyGroupReducer,
},
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

});

export default store;