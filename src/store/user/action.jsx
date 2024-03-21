import { toast } from "react-toastify";
import { UserServices } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const ACT_USER_LOGIN = "ACT_USER_LOGIN";
export const ACT_USER_NOT_FETCH_ME = "ACT_USER_NOT_FETCH_ME";
export const ALL_ROLE = "ALL_ROLE";

export function actUserLogin(currentUser, token, role) {
  return {
    type: ACT_USER_LOGIN,
    payload: {
      currentUser,
      token,
      role,
    },
  };
}
export function actUserNotFetchMe(token) {
  return {
    type: ACT_USER_NOT_FETCH_ME,
    payload: token,
  };
}

export const allRole = (list) => {
  return {
    type: ALL_ROLE,
    payload: list,
  };
};
export function actAllRoleGetAsync() {
  return (dispatch) => {
    UserServices.getRole()
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(allRole(response.data));
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

export function actPostUserAsync(data) {
  return async (dispatch) => {
    try {
      const response = await UserServices.register(data);
      const navigate = useNavigate();
      if (response.status === 200 || response.status === 201) {
        toast.success("New User has been added successfully ~");
        navigate("/login");
      }
      // dispatch(actUserGetAsync());
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
      }
    }
  };
}
