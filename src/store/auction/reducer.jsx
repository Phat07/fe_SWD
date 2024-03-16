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
  GET_AUCTION_MEMBER_AUCTION_NOT_YET,
  GET_AUCTION_MEMBER_AUCTION_ABOUT_TO,
  GET_AUCTION_MEMBER_AUCTIONING,
  GET_AUCTION_MEMBER_AUCTIONED,
  GET_MOST_PRICE_AUCTIONID,
  GET_MEMBER_PRICE_AUCTIONID,
  GET_AUCTION_MEMBER_JOIN_AUCTION_ROOM,
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
  // member
  notYetAuctionMember: [],
  aboutToAuctionMember: [],
  auctioningMember: [],
  auctinedMember: [],
  mostPrice: "",
  memberPriceAuction: [],
  allMemberJoinInAuction: [],
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

    // member

    case GET_AUCTION_MEMBER_AUCTION_NOT_YET:
      return {
        ...state,
        notYetAuctionMember: action.payload,
      };
    case GET_AUCTION_MEMBER_AUCTION_ABOUT_TO:
      return {
        ...state,
        aboutToAuctionMember: action.payload,
      };
    case GET_AUCTION_MEMBER_AUCTIONING:
      return {
        ...state,
        auctioningMember: action.payload,
      };
    case GET_AUCTION_MEMBER_AUCTIONED:
      return {
        ...state,
        auctinedMember: action.payload,
      };

    // price
    case GET_MOST_PRICE_AUCTIONID:
      return {
        ...state,
        mostPrice: action.payload,
      };
    case GET_AUCTION_MEMBER_JOIN_AUCTION_ROOM:
      return {
        ...state,
        allMemberJoinInAuction: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
