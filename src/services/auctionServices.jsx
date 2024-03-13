import { API } from "./api";

export const AuctionServices = {
  addAuction(data, token) {
    return API.post("/auctions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllAuction(token) {
    return API.get("/auctions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionNotYetAuctionedByUser(id, token) {
    return API.get(`/auctions/not-yet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionNotYetAuctionedByCustomer(token) {
    return API.get(`/auctions/not-yet`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionAboutToAuctionByUser(id, token) {
    return API.get(`/auctions/about-to/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionAboutToAuctionByCustomer(token) {
    return API.get(`/auctions/about-to`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctioningByUser(id, token) {
    return API.get(`/auctions/auctioning/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctioningByCustomer(token) {
    return API.get(`/auctions/auctioning`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionedByUser(id, token) {
    return API.get(`/auctions/autioned/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionedByCustomer(token) {
    return API.get(`/auctions/autioned`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // API cho member
  getAuctionNotYetByMember(id, token) {
    return API.get(`/auctions/memberAuctions-not-yet/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionAboutToByMember(id, token) {
    return API.get(`/auctions/memberAuctions-about-to/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctioningByMember(id, token) {
    return API.get(`/auctions/memberAuctions-auctioning/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAuctionedByMember(id, token) {
    return API.get(`/auctions/memberAuctions-autioned/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //  post AuctionBid

  postAuctionBid(data, token) {
    return API.post(
      `/auctionBid/${data.auctionId}/${data.customerId}/new-bid`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  getMostAuctionBid(data, token) {
    return API.get(`/auctions/getMostPriceInAuctionBid/${data.auctionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getMemberJoinAuctionBid(data, token) {
    return API.get(`/auctionBid/auctionBid-sortDes/${data.auctionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
