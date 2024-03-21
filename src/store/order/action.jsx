import { toast } from "react-toastify";
import { OrderServices } from "../../services/orderServices";

export const ORDER_BY_MEMBER = "ORDER_BY_MEMBER";
export const ORDER_BY_HOST = "ORDER_BY_HOST";

export const orderByMember = (list) => {
  return {
    type: ORDER_BY_MEMBER,
    payload: list,
  };
};

export const orderByHost = (list) => {
  return {
    type: ORDER_BY_HOST,
    payload: list,
  };
};

export function actOrderByMemberGetAsync(id, token) {
  return (dispatch) => {
    OrderServices.getAllOrderMember(id, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(orderByMember(response.data));
        } else {
          // toast.error("get all syllabus to fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all config money:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}

export function actOrderByHostGetAsync(id, token) {
  return (dispatch) => {
    OrderServices.getAllOrderHost(id, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(orderByHost(response.data));
        } else {
          // toast.error("get all syllabus to fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all config money:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
