import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  EDIT_SUCCESS,
  EDIT_FAIL,
  PARTNER_ADDED,
  PARTNER_FAIL,
  FORGOT,
  FORGOT_FAIL,
  SET_LOADING,
  RESET_TOKEN_OK,
  RESET_TOKEN_FAIL,
  RESET_OK,
  RESET_FAIL,
} from '../actions/Types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  partner: false,
  formLoading: false,
  forgot: false,
  reset: false,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        open: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        open: true,
        error: null,
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case FORGOT_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        formLoading: false,
        forgot: false,
        partner: false,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        error: null,
        formLoading: false,
        user: action.payload,
      };
    case EDIT_FAIL:
      return {
        ...state,
        error: action.payload,
        formLoading: false,
      };
    case PARTNER_ADDED:
      return {
        ...state,
        partner: true,
      };
    case PARTNER_FAIL:
      return {
        ...state,
        partner: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
        formLoading: false,
        forgot: false,
        partner: false,
      };
    case SET_LOADING:
      return {
        ...state,
        formLoading: true,
      };
    case FORGOT:
      return {
        ...state,
        forgot: true,
        formLoading: false,
      };
    case RESET_TOKEN_OK:
      return {
        ...state,
        reset: true,
        loading: false,
        email: action.payload,
        formLoading: false,
      };
    case RESET_TOKEN_FAIL:
      return {
        ...state,
        reset: false,
        loading: false,
        error: action.payload,
        email: null,
        formLoading: false,
      };

    case RESET_OK:
      return {
        ...state,
        token: action.payload,
        formLoading: false,
        error: null,
      };
    case RESET_FAIL:
      return {
        ...state,
        token: null,
        formLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
