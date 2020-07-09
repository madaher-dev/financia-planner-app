import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  EDIT_FAIL,
  EDIT_SUCCESS,
  PARTNER_ADDED,
  PARTNER_FAIL,
} from './Types';
import axios from 'axios';

// Register User

export const registerUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const result = await axios.post('/api/users', user, config);
    console.log(result);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data, //Token
    });
    //  dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

// Login User

export const loginUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', user, config);

    //returns token
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token, //Token
    });
    // dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  try {
    const loaded = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: loaded.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
  }
};

// Edit User (Use online in register stepper)

export const editUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const loaded = await axios.put('/api/users', user, config);

    dispatch({
      type: EDIT_SUCCESS,
      payload: loaded.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_FAIL,
      payload: err.response.data,
    });
  }
};

// Add a Partner

export const addPartner = (partner) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const result = await axios.post('/api/partners', partner, config);

    dispatch({
      type: PARTNER_ADDED,
    });
  } catch (err) {
    dispatch({
      type: PARTNER_FAIL,
      payload: err.response.data,
    });
  }
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
