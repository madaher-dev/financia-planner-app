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
  FORGOT,
  FORGOT_FAIL,
  SET_LOADING,
  RESET_TOKEN_OK,
  RESET_TOKEN_FAIL,
  RESET_OK,
  RESET_FAIL,
  PARTNER_LOADED,
  EDIT_PARTNER,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
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
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
  }
};

// Load Partner

export const loadPartner = () => async (dispatch) => {
  try {
    const partner = await axios.get('/api/users/partner');

    dispatch({
      type: PARTNER_LOADED,
      payload: partner.data,
    });
  } catch (err) {
    console.log('Partner failed to load');
  }
};

// Edit User (when editing make sure not to ruin registration steps)

export const editUser = (user, dateob) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    user.dob = dateob;

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

// Edit User (from Form inside app)

export const editUserForm = (user, dateob) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    user.dob = dateob;

    const loaded = await axios.put('/api/users', user, config);

    dispatch({
      type: UPDATE_SUCCESS,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: UPDATE_FAIL,
      payload: err.response.data,
    });
  }
};

// Update password (from Form inside app)

export const changePass = (pass) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const newPass = { password: pass };

  try {
    const loaded = await axios.put('/api/auth/updatePass', newPass, config);

    dispatch({
      type: UPDATE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_FAIL,
      payload: err.response.data,
    });
  }
};

// Edit Partner

export const editPartner = (partner) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const loaded = await axios.put('/api/users/partner', partner, config);

    dispatch({
      type: EDIT_PARTNER,
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

export const addPartner = (partner, dateob) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    partner.pdob = dateob;
    console.log(partner);
    console.log(dateob);
    await axios.post('/api/partners', partner, config);

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
// Forgot Password

export const forgotPass = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put('/api/auth/forgot', user, config);

    dispatch({
      type: FORGOT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORGOT_FAIL,
      payload: err.response.data,
    });
  }
};

// Check Token

export const checkToken = (token1) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const payload = {
    token: token1,
  };
  try {
    const result = await axios.post('../api/auth/reset', payload, config);

    dispatch({
      type: RESET_TOKEN_OK,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: RESET_TOKEN_FAIL,
      payload: err.response.data,
    });
  }
};

// Reset Password

export const resetPassword = (payload) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const resetResponse = await axios.put('../api/auth/reset', payload, config);

    dispatch({
      type: RESET_OK,
      payload: resetResponse.data.token,
    });
  } catch (err) {
    dispatch({
      type: RESET_FAIL,
      payload: err.response.data,
    });
  }
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

//Logout User
export const logout = () => ({ type: LOGOUT });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });
