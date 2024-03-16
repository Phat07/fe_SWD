import { API } from "./api";

export const OrderServices = {
  getAllOrder(token) {
    return API.get("/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
 
};