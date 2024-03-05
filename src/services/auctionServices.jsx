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
  // fetchMe: (token) => {
  //   return API.get("/users/fetchMe", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },
};
