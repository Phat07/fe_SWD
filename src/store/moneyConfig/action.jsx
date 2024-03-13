import { toast } from "react-toastify";
import { MoneyConfigServices } from "../../services/moneyConfigServices";

export const CONFIG_MONEY = "CONFIG_MONEY";

export const conFigMoney = (list) => {
  return {
    type: CONFIG_MONEY,
    payload: list,
  };
};

export function actMoneyCofigGetAsync(token) {
  return (dispatch) => {
    MoneyConfigServices.getConfigMoney(token)
      .then((response) => {
        console.log("moneyConFig", response);
        if (response.status === 200 || response.status === 201) {
          dispatch(conFigMoney(response.data));
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
