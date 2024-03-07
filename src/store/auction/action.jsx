import { AuctionServices } from "../../services/auctionServices";
export const ALL_AUCTION = "ALL_AUCTION";
export const NOT_YET_AUCTION = "NOT_YET_AUCTION";
export const ABOUT_TO_AUCTION = "ABOUT_TO_AUCTION";
export const AUCTIONING = "AUCTIONING";
export const AUCTIONED = "AUCTIONED";
export const AUCTIONING_CUSTOMER = "AUCTIONING_CUSTOMER";
export const NOT_YET_AUCTION_CUSTOMER = "NOT_YET_AUCTION_CUSTOMER";
export const ABOUT_TO_AUCTION_CUSTOMER = "ABOUT_TO_AUCTION_CUSTOMER";
export const AUCTIONED_CUSTOMER = "AUCTIONED_CUSTOMER";

export const allAuction = (list) => {
  return {
    type: ALL_AUCTION,
    payload: list,
  };
};
export const notYetAuction = (list) => {
  return {
    type: NOT_YET_AUCTION,
    payload: list,
  };
};
export const notYetAuctionCustomer = (list) => {
  return {
    type: NOT_YET_AUCTION_CUSTOMER,
    payload: list,
  };
};
export const aboutToAuction = (list) => {
  return {
    type: ABOUT_TO_AUCTION,
    payload: list,
  };
};
export const aboutToAuctionCustomer = (list) => {
  return {
    type: ABOUT_TO_AUCTION_CUSTOMER,
    payload: list,
  };
};
export const Auctioning = (list) => {
  return {
    type: AUCTIONING,
    payload: list,
  };
};
export const AuctioningCustomer = (list) => {
  return {
    type: AUCTIONING_CUSTOMER,
    payload: list,
  };
};
export const Auctioned = (list) => {
  return {
    type: AUCTIONED,
    payload: list,
  };
};
export const AuctionedCustomer = (list) => {
  return {
    type: AUCTIONED_CUSTOMER,
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
export function actNotYetAuctionGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionNotYetAuctionedByUser(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(notYetAuction(response.data));
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
export function actNotYetAuctionCustomerGetAsync(token) {
  return (dispatch) => {
    AuctionServices.getAuctionNotYetAuctionedByCustomer(token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(notYetAuctionCustomer(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all not yet auctions:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
export function actAboutToAuctionGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionAboutToAuctionByUser(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(aboutToAuction(response.data));
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
export function actAboutToAuctionCustomerGetAsync(token) {
  return (dispatch) => {
    AuctionServices.getAuctionAboutToAuctionByCustomer(token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(aboutToAuctionCustomer(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all about to auctions:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
export function actAuctioningAuctionGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctioningByUser(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(Auctioning(response.data));
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
export function actAuctioningCustomerGetAsync(token) {
  return (dispatch) => {
    AuctionServices.getAuctioningByCustomer(token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(AuctioningCustomer(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all auctioning:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
export function actAuctionedAuctionGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionedByUser(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(Auctioned(response.data));
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
export function actAuctionedCustomerGetAsync(token) {
  return (dispatch) => {
    AuctionServices.getAuctionedByCustomer(token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(AuctionedCustomer(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all auctioned:", error);
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
