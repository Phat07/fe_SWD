import { ALL_REQUEST_ID } from "./action";

const initialState = {
  allRequestId: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_REQUEST_ID:
      return {
        ...state,
        allRequestId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
