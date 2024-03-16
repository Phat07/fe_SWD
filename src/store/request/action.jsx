import { RequestServices } from "../../services/requestServices";

export const ALL_REQUEST_ID = "ALL_REQUEST_ID";

export const allRequestById = (list) => {
  return {
    type: ALL_REQUEST_ID,
    payload: list,
  };
};

export function actRequestGetByUserIdAsync(id, token) {
  return (dispatch) => {
    RequestServices.getAllRequestByUserId(id, token)
      .then((response) => {
        console.log("Request data: ", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(allRequestById(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all Request:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
