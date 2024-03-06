import { AuctionServices } from "../../services/auctionServices";

export const ALL_AUCTION = "ALL_AUCTION";

export const allAuction = (list) => {
  return {
    type: ALL_AUCTION,
    payload: list,
  };
};
export function actAuctionGetAsync(token) {
  return (dispatch) => {
    AuctionServices.getAllAuction(token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(allAuction(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all auctions:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}

export function actAuctionPostAsync(data, token) {
  return async (dispatch) => {
    try {
      const response = await AuctionServices.addAuction(data, token);
      if (response.status === 200 || response.status === 201) {
        // toast.success("New Product has been added successfully ~");
        dispatch(actAuctionGetAsync(token));
      } else {
        // toast.error("Post Product to fail");
        console.log("fail");
      }
    } catch (error) {
      console.error("Error occurred while posting auction:", error);
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo cho người dùng
    }
  };
}
