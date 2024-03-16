import { toast } from "react-toastify";
import { AuctionServices } from "../../services/auctionServices";
import { data } from "@tensorflow/tfjs";
export const ALL_AUCTION = "ALL_AUCTION";
export const NOT_YET_AUCTION = "NOT_YET_AUCTION";
export const ABOUT_TO_AUCTION = "ABOUT_TO_AUCTION";
export const AUCTIONING = "AUCTIONING";
export const AUCTIONED = "AUCTIONED";
export const AUCTIONING_CUSTOMER = "AUCTIONING_CUSTOMER";
export const NOT_YET_AUCTION_CUSTOMER = "NOT_YET_AUCTION_CUSTOMER";
export const ABOUT_TO_AUCTION_CUSTOMER = "ABOUT_TO_AUCTION_CUSTOMER";
export const AUCTIONED_CUSTOMER = "AUCTIONED_CUSTOMER";
export const GET_MOST_PRICE_AUCTIONID = "GET_MOST_PRICE_AUCTIONID";
export const GET_MEMBER_PRICE_AUCTIONID = "GET_MEMBER_PRICE_AUCTIONID";
export const GET_AUCTION_MEMBER_JOIN_AUCTION_ROOM = "GET_AUCTION_MEMBER_JOIN_AUCTION_ROOM";

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
        toast.success("New Auction has been added successfully ~");
        // dispatch(actAuctionGetAsync(token));
      } else {
        // toast.error("Post Product to fail");
        console.log("fail");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error(
          "Failed to load resource: the server responded with a status of 400 (Bad Request)",
          error
        );
        toast.error(error.response.data.error);
      } else {
        console.error("An error occurred while making the request:", error);
        toast.error("Lỗi: " + error.message);
      }
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo cho người dùng
    }
  };
}

export const GET_AUCTION_MEMBER_AUCTION_NOT_YET =
  "GET_AUCTION_MEMBER_AUCTION_NOT_YET";
export const GET_AUCTION_MEMBER_AUCTION_ABOUT_TO =
  "GET_AUCTION_MEMBER_AUCTION_ABOUT_TO";
export const GET_AUCTION_MEMBER_AUCTIONING = "GET_AUCTION_MEMBER_AUCTIONING";
export const GET_AUCTION_MEMBER_AUCTIONED = "GET_AUCTION_MEMBER_AUCTIONED";

export const getMemberAuctionNotYet = (list) => {
  return {
    type: GET_AUCTION_MEMBER_AUCTION_NOT_YET,
    payload: list,
  };
};
export const getMemberAuctionAboutTo = (list) => {
  return {
    type: GET_AUCTION_MEMBER_AUCTION_ABOUT_TO,
    payload: list,
  };
};
export const getMemberAuctioning = (list) => {
  return {
    type: GET_AUCTION_MEMBER_AUCTIONING,
    payload: list,
  };
};
export const getMemberAuctioned = (list) => {
  return {
    type: GET_AUCTION_MEMBER_AUCTIONED,
    payload: list,
  };
};

export function actAuctionNotYetMemberGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionNotYetByMember(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMemberAuctionNotYet(response.data));
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
export function actAuctionAboutToMemberGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionAboutToByMember(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMemberAuctionAboutTo(response.data));
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
export function actAuctioningMemberGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctioningByMember(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMemberAuctioning(response.data));
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
export function actAuctionedMemberGetAsync(id, token) {
  return (dispatch) => {
    AuctionServices.getAuctionedByMember(id, token)
      .then((response) => {
        console.log("dataAuction", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMemberAuctioned(response.data));
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


export const getMostPriceAuctionId = (list) => {
  return {
    type: GET_MOST_PRICE_AUCTIONID,
    payload: list,
  };
};

export function actGetMostPriceAuctionGetAsync(data, token) {
  return (dispatch) => {
    AuctionServices.getMostAuctionBid(data, token)
      .then((response) => {
        console.log("mostPrice", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMostPriceAuctionId(response.data));
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

export const getMemberPriceAuctionId = (list) => {
  return {
    type: GET_MEMBER_PRICE_AUCTIONID,
    payload: list,
  };
};
export function actGetMemberJoinAuctionGetAsync(data, token) {
  return (dispatch) => {
    AuctionServices.getMemberJoinAuctionBid(data, token)
      .then((response) => {
        console.log("mostPrice", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getMemberPriceAuctionId(response.data));
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



//  auctionBid

export function actAuctionBidPost(data, token) {
  return (dispatch) => {
    AuctionServices.postAuctionBid(data, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // dispatch(allAuction(response.data));
          console.log("successAuction", response);
          let dataMost = {
            auctionId: data?.auctionId,
          };
          dispatch(actGetMostPriceAuctionGetAsync(dataMost, token));
          dispatch(actGetMemberJoinAuctionGetAsync(dataMost, token));
          toast.success(`Bạn đã đấu giá thành công với số tiền ${data?.price}`);
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
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
      });
  };
}


// get all member in join room auction
export const getAllMemberInJoinAuctionRoom = (list) => {
  return {
    type: GET_AUCTION_MEMBER_JOIN_AUCTION_ROOM,
    payload: list,
  };
};

export function actGetAllMemberJoinAuctionRoomGetAsync(data, token) {
  return (dispatch) => {
    AuctionServices.getAllMemberInJoinAuctionBid(data, token)
      .then((response) => {
        console.log("mostPrice", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(getAllMemberInJoinAuctionRoom(response.data));
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