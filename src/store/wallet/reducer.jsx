import { WALLET_ID } from "./action";

const initialState = {
  wallet: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_ID:
      return {
        ...state,
        wallet: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
