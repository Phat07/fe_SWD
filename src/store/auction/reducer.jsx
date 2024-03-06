import { ALL_AUCTION } from "./action";

const initialState = {
  auctions: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_AUCTION:
      return {
        ...state,
        auctions: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
