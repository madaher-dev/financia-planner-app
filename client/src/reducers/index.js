import { combineReducers } from 'redux';
import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  users: userReducer,
  nav: navReducer,
  alerts: alertReducer,
});
