import {
  ADD_CHILD,
  DELETE_CHILD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CHILD,
  CHILD_ERROR,
  GET_FAMILY,
  CLEAR_FAMILY,
} from './Types';
import axios from 'axios';

// Get Family
export const getFamily = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/family');

    dispatch({ type: GET_FAMILY, payload: res.data });
  } catch (err) {
    dispatch({ type: CHILD_ERROR, payload: err.response.data });
  }
};

// Add Child
export const addChild = (child) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/family', child, config);

    dispatch({
      type: ADD_CHILD,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: CHILD_ERROR, payload: err.response.data });
  }
};
// Delete Child
export const deleteChild = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/family/${id}`);
    dispatch({ type: DELETE_CHILD, payload: id });
  } catch (err) {
    dispatch({ type: CHILD_ERROR, payload: err.response.data });
  }
};

// Set Current Child
export const setCurrent = (child) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: child,
  });
};
// Clear Current Child
export const clearCurrent = () => ({ type: CLEAR_CURRENT });

// Update Child
export const editChild = (child) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/family/${child.id}`, child, config);
    dispatch({ type: UPDATE_CHILD, payload: res.data });
  } catch (err) {
    dispatch({ type: CHILD_ERROR, payload: err.response.data });
  }
};

// Clear Family
export const clearFamily = () => ({ type: CLEAR_FAMILY });
