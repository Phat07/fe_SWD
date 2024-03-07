import { API } from "./api";

export const UserServices = {
  loginUser(data) {
    return API.post("/users/login", data);
  },
  register(data) {
    return API.post("/users/register", data);
  },
  getRole() {
    return API.get("/roles");
  },
  fetchMe: (token) => {
    return API.get("/users/fetchMe", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
