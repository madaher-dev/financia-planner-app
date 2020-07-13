import {
  EDIT_GOAL,
  EDIT_FAIL,
  GOAL_LOADED,
  CLEAR_ERRORS,
  SET_LOADING,
} from './Types';
import axios from 'axios';

// Load Goal

export const loadGoal = () => async (dispatch) => {
  try {
    const loaded = await axios.get('/api/goals');

    dispatch({
      type: GOAL_LOADED,
      payload: loaded.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_FAIL,
      payload: err.response.data,
    });
  }
};

// Edit Goal

export const editGoal = (newGoal) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const edited = await axios.put('/api/goals', newGoal, config);

    dispatch({
      type: EDIT_GOAL,
      payload: edited.data,
    });
  } catch (err) {
    dispatch({
      type: EDIT_FAIL,
      payload: err.response.data,
    });
  }
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });
