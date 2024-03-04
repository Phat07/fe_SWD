import { API } from "./api";

export const ProductServices = {
  addProduct(data, token) {
    return API.post("/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllProduct() {
    return API.get("/products");
  },
  // fetchMe: (token) => {
  //   return API.get("/users/fetchMe", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },
};
