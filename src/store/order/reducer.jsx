import { ORDER_BY_MEMBER, ORDER_BY_HOST } from "./action";

const initialState = {
  ordersByMember: [],
  ordersByHost: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BY_MEMBER:
      return {
        ...state,
        ordersByMember: action.payload,
      };
    case ORDER_BY_HOST:
      return {
        ...state,
        ordersByHost: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
