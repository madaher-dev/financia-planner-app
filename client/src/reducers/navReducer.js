import { TITLE, BAR_OPEN, BAR_CLOSE } from '../actions/Types';

const initialState = {
  barOpen: true,
  title: 'Financial Planner',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BAR_OPEN:
      return {
        ...state,
        barOpen: true,
      };
    case BAR_CLOSE:
      return {
        ...state,
        barOpen: false,
      };
    case TITLE:
      return {
        ...state,
        title: action.payload,
      };

    default:
      return state;
  }
};
