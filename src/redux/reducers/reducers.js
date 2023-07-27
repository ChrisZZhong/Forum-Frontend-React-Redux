// reducers.js

import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import userProfileReducer from './userProfileReducer';
import postsReducer from './postReducer';
import emailReducer from './emailReducer';
import historyReducer from "./historyReducer";
import notificationReducer from "./notificationReducer";


const appReducer = combineReducers({
  auth: authenticationReducer,
  user: userReducer,
  userProfile : userProfileReducer,
  message: messageReducer,
  post: postsReducer,
  email : emailReducer,
  history : historyReducer,
  notification: notificationReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
