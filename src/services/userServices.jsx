import { API } from "./api";

export const UserServices = {
  loginUser(data) {
    return API.post("/users/login", data);
  },
  fetchMe: (token) => {
    return API.get("/users/fetchMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
