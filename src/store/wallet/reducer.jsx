import { WALLET_ID, WALLET_HISTORY_ID } from "./action";

const initialState = {
  wallet: "",
  walletHistory: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_ID:
      return {
        ...state,
        wallet: action.payload,
      };
    case WALLET_HISTORY_ID:
      return {
        ...state,
        walletHistory: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
