import { ORDER } from "./action";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER:
      return {
        ...state,
        orders: action.payload,
      }
    default:
      return state;
  }
};

export default reducer;
