import {
  ALL_AUCTION,
  NOT_YET_AUCTION,
  ABOUT_TO_AUCTION,
  AUCTIONING,
  AUCTIONED,
  AUCTIONING_CUSTOMER,
  NOT_YET_AUCTION_CUSTOMER,
  ABOUT_TO_AUCTION_CUSTOMER,
  AUCTIONED_CUSTOMER,
} from "./action";

const initialState = {
  auctions: [],
  notYetAuction: [],
  aboutToAuction: [],
  auctioning: [],
  auctined: [],
  notYetAuctionCustomer: [],
  aboutToAuctionCustomer: [],
  auctioningCustomer: [],
  auctinedCustomer: [],
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

    case NOT_YET_AUCTION_CUSTOMER:
      return {
        ...state,
        notYetAuctionCustomer: action.payload,
      };
    case ABOUT_TO_AUCTION_CUSTOMER:
      return {
        ...state,
        aboutToAuctionCustomer: action.payload,
      };
    case AUCTIONING_CUSTOMER:
      return {
        ...state,
        auctioningCustomer: action.payload,
      };
    case AUCTIONED_CUSTOMER:
      return {
        ...state,
        auctinedCustomer: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
