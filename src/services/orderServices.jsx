import { data } from "@tensorflow/tfjs";
import { API } from "./api";

export const OrderServices = {
  getAllOrderMember(id,token) {
    return API.get(`/auctions/getOrderMember/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllOrderHost(id,token) {
    return API.get(`/auctions/getOrderHost/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};