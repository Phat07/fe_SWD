import {
  ALL_AUCTION,
  NOT_YET_AUCTION,
  ABOUT_TO_AUCTION,
  AUCTIONING,
  AUCTIONED,
} from "./action";

const initialState = {
  auctions: [],
  notYetAuction: [],
  aboutToAuction: [],
  auctioning: [],
  auctined: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_AUCTION:
      return {
        ...state,
        auctions: action.payload,
      };
    case NOT_YET_AUCTION:
      return {
        ...state,
        notYetAuction: action.payload,
      };
    case ABOUT_TO_AUCTION:
      return {
        ...state,
        aboutToAuction: action.payload,
      };
    case AUCTIONING:
      return {
        ...state,
        auctioning: action.payload,
      };
    case AUCTIONED:
      return {
        ...state,
        auctined: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
