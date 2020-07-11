import { combineReducers } from 'redux';
import userReducer from './userReducer';
import navReducer from './navReducer';
import alertReducer from './alertReducer';
import assetReducer from './assetReducer';
import loanReducer from './loanReducer';

export default combineReducers({
  users: userReducer,
  nav: navReducer,
  alerts: alertReducer,
  assets: assetReducer,
  loans: loanReducer,
});
