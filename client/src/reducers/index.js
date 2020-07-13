import { combineReducers } from 'redux';
import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import assetReducer from './assetReducer';
import loanReducer from './loanReducer';
import childReducer from './childReducer';
import goalReducer from './goalReducer';

export default combineReducers({
  users: userReducer,
  nav: navReducer,
  alerts: alertReducer,
  assets: assetReducer,
  loans: loanReducer,
  family: childReducer,
  goals: goalReducer,
});
