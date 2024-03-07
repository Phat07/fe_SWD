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
  // fetchMe: (token) => {
  //   return API.get("/users/fetchMe", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },
};
