import { toast } from "react-toastify";
import { WalletServices } from "../../services/walletServices";
import { data } from "@tensorflow/tfjs";
import { actGetAllMemberJoinAuctionRoomGetAsync } from "../auction/action";

export const WALLET_ID = "WALLET_ID";
export const WALLET_HISTORY_ID = "WALLET_HISTORY_ID";

export const getWalletById = (list) => {
  return {
    type: WALLET_ID,
    payload: list,
  };
};
export const getWalletHistoryById = (list) => {
  return {
    type: WALLET_HISTORY_ID,
    payload: list,
  };
};
export function actGetWalletByUserAsync(data, token) {
  return (dispatch) => {
    WalletServices.getWallet(data, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(getWalletById(response.data));
        } else {
          // toast.error("get all syllabus to fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all products:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
export function actGetWalletHistoryByUserAsync(data, token) {
  return (dispatch) => {
    WalletServices.getWalletHistory(data, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(getWalletHistoryById(response.data));
        } else {
          // toast.error("get all syllabus to fail");
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
        toast.warning("Hãy đợi Admin xác nhận tiền của bạn ~");
      }
      dispatch(actGetWalletByUserAsync(data?.user_id, token));
    } catch (error) {
      console.error("An error occurred whiles making the request:", error);
      toast.error("An error occurred while making the request");
    }
  };
}

// gọi lại các atc bên auction qua wallet

export function actJoinRegisterAuctionForMemberAsync(data, token) {
  return async (dispatch) => {
    try {
      const response = await WalletServices.postJoinRegisterAuction(
        data,
        token
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Bạn đã đăng ký thành công cho buổi đấu giá ~");
      }
      let data1 = {
        auctionId: data.auctionId,
      };
      // if (response.status === 400) {
      //   toast.error("Bạn đã là thành viên của buổi đấu giá ~");
      // }
      dispatch(actGetWalletByUserAsync(data?.user_id, token));
      dispatch(actGetWalletHistoryByUserAsync(data?.user_id, token));
      dispatch(actGetAllMemberJoinAuctionRoomGetAsync(data1, token));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(
          "Failed to load resource: the server responded with a status of 400 (Bad Request)",
          error
        );
        toast.error(error.response.data.error || error.response.data.message);
      } else {
        console.error(
          "An error occurred while making the request:",
          error.response.data.message
        );
        toast.error("Lỗi: " + error.message);
      }
    }
  };
}
