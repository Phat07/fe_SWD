import { API } from "./api";

export const MoneyConfigServices = {
  getConfigMoney(token) {
    return API.get("/configs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
 
};