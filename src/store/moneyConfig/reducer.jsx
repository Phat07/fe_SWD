import { CONFIG_MONEY } from "./action";

const initialState = {
  configMoney: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_MONEY:
      return {
        ...state,
        configMoney: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
