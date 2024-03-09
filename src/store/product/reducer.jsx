import { ALL_PRODUCT,ALL_PRODUCT_ALL } from "./action";

const initialState = {
  products: [],
  productsALL: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
      case ALL_PRODUCT_ALL:
      return {
        ...state,
        productsALL: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
