import { API } from "./api";

export const WalletServices = {
  addWallet(data, token) {
    return API.post("/report_requests/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getWallet(data, token) {
    return API.get(`/wallets/getWalletByUserId/${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
