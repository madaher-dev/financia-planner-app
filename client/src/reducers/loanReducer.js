import {
  ADD_LOAN,
  DELETE_LOAN,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOAN,
  LOAN_ERROR,
  GET_LOANS,
  CLEAR_LOANS,
} from '../actions/Types';

const initialState = {
  loans: [],
  current: null,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOAN:
      return {
        ...state,
        loans: [action.payload, ...state.loans],
        loading: false,
      };
    case GET_LOANS:
      return {
        ...state,
        loans: action.payload,
        loading: false,
      };
    case DELETE_LOAN:
      return {
        ...state,
        loans: state.loans.filter((loan) => loan._id !== action.payload),
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
    case UPDATE_LOAN:
      return {
        ...state,
        loans: state.loans.map((loan) =>
          loan._id === action.payload._id ? action.payload : loan
        ),
        loading: false,
      };

    case CLEAR_LOANS:
      return {
        ...state,
        filtered: null,
        loans: null,
        error: null,
        current: null,
      };
    case LOAN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
