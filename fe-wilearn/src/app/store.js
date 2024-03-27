import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import studyGroupReducer from "./reducer/studyGroupReducer";
import peersReducer from "./reducer/peersReducer/peersReducer";
import votesReducer from "./reducer/voteReducer/votesReducer";
// import logger from 'redux-logger';

const store = configureStore({
    reducer: {
        // Your reducers here
        user: userReducer,
        studyGroup: studyGroupReducer,
        // settings: settingsReducer,
        votes: votesReducer,
        peers: peersReducer
    },
    //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)

});

export default store;