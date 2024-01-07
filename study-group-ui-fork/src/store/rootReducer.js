import authReducer from 'src/pages/auth/reducer';
import studyGroupReducer from 'src/pages/studyGroup/reducer';
import settingsReducer from 'src/pages/settings/reducer';
import votesReducer from 'src/context/reducers';

const rootReducers = {
  auth: authReducer,
  studyGroup: studyGroupReducer,
  settings: settingsReducer,
  votes: votesReducer
};

export default rootReducers;
