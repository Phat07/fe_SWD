import { toast } from "react-toastify";
import { WalletServices } from "../../services/walletServices";

export const WALLET_ID = "WALLET_ID";

export const getWalletById = (list) => {
  return {
    type: WALLET_ID,
    payload: list,
  };
};
export function actGetWalletByUserAsync(data, token) {
  return (dispatch) => {
    WalletServices.getWallet(data, token)
      .then((response) => {
        console.log("wallets", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getWalletById(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all products:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
export function actPostWalletUserByIdAsync(data, token) {
  return async (dispatch) => {
    try {
      const response = await WalletServices.addWallet(data, token);
      if (response.status === 200 || response.status === 201) {
        toast.success("New Wallets has been added successfully ~");
      }
      dispatch(actGetWalletByUserAsync(data?.user_id, token));
    } catch (error) {
      console.error("An error occurred whiles making the request:", error);
      toast.error("An error occurred while making the request");
    }
  };
}
