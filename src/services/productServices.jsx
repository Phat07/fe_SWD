import { API } from "./api";

export const ProductServices = {
  addProduct(data, token) {
    return API.post("/products/addProduct", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllProduct() {
    return API.get("/products");
  },
  getAllProductByUserId(data, token) {
    return API.get(`/products/${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
