import { toast } from "react-toastify";
import { OrderServices } from "../../services/orderServices";

export const ORDER = "ORDER";

export const order = (list) => {
  return {
    type: ORDER,
    payload: list,
  };
};

export function actOrderGetAsync(token) {
  return (dispatch) => {
    OrderServices.getAllOrder(token)
      .then((response) => {
        console.log("moneyConFig", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(order(response.data));
        } else {
          // toast.error("get all syllabus to fail");
          console.log("fail");
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error while fetching all config money:", error);
        // Nếu bạn muốn dispatch một action để xử lý lỗi, bạn có thể thực hiện ở đây
      });
  };
}
