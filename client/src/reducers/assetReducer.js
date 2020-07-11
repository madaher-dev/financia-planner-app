import {
  ADD_ASSET,
  DELETE_ASSET,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ASSET,
  ASSET_ERROR,
  GET_ASSETS,
  CLEAR_ASSETS,
} from '../actions/Types';

const initialState = {
  assets: [],
  current: null,
  error: null,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ASSET:
      return {
        ...state,
        assets: [action.payload, ...state.assets],
        loading: false,
      };
    case GET_ASSETS:
      return {
        ...state,
        assets: action.payload,
        loading: false,
      };
    case DELETE_ASSET:
      return {
        ...state,
        assets: state.assets.filter((asset) => asset._id !== action.payload),
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
    case UPDATE_ASSET:
      return {
        ...state,
        assets: state.assets.map((asset) =>
          asset._id === action.payload._id ? action.payload : asset
        ),
        loading: false,
      };

    case CLEAR_ASSETS:
      return {
        ...state,
        filtered: null,
        assets: null,
        error: null,
        current: null,
      };
    case ASSET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
