import {
  EDIT_GOAL,
  EDIT_FAIL,
  GOAL_LOADED,
  CLEAR_ERRORS,
  SET_LOADING,
} from '../actions/Types';

const initialState = {
  goal: null,
  error: null,
  edit: null,
  formLoading: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GOAL_LOADED:
      return {
        ...state,
        goal: action.payload,
        formLoading: false,
        error: false,
      };
    case EDIT_GOAL:
      return {
        ...state,
        goal: action.payload,
        error: false,
        edit: true,
        formLoading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        formLoading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,

        formLoading: false,

        edit: false,
      };
    case EDIT_FAIL:
      return {
        ...state,

        error: true,
        edit: false,
      };
    default:
      return state;
  }
};
