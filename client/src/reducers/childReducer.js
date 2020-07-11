import {
  ADD_CHILD,
  DELETE_CHILD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CHILD,
  CHILD_ERROR,
  GET_FAMILY,
  CLEAR_FAMILY,
} from '../actions/Types';

const initialState = {
  family: [],
  current: null,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return {
        ...state,
        family: [action.payload, ...state.family],
        loading: false,
      };
    case GET_FAMILY:
      return {
        ...state,
        family: action.payload,
        loading: false,
      };
    case DELETE_CHILD:
      return {
        ...state,
        family: state.family.filter((loan) => loan._id !== action.payload),
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_CHILD:
      return {
        ...state,
        family: state.family.map((loan) =>
          loan._id === action.payload._id ? action.payload : loan
        ),
        loading: false,
      };

    case CLEAR_FAMILY:
      return {
        ...state,
        filtered: null,
        loans: null,
        error: null,
        current: null,
      };
    case CHILD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
