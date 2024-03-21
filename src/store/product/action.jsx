import { toast } from "react-toastify";
import { ProductServices } from "../../services/productServices";

export const ALL_PRODUCT = "ALL_PRODUCT";
export const ALL_PRODUCT_ALL = "ALL_PRODUCT_ALL";

export const allProduct = (list) => {
  return {
    type: ALL_PRODUCT,
    payload: list,
  };
};
export const allProductAll = (list) => {
  return {
    type: ALL_PRODUCT_ALL,
    payload: list,
  };
};
export function actProductGetByUserIdAsync(data, token) {
  return (dispatch) => {
    ProductServices.getAllProductByUserId(data, token)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(allProduct(response.data));
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
export function actProductGetAsync() {
  return (dispatch) => {
    ProductServices.getAllProduct()
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          dispatch(allProductAll(response.data));
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

export function actProductPostAsync(data, token) {
  return async (dispatch) => {
    const response = await ProductServices.addProduct(data, token);
    if (response.status === 200 || response.status === 201) {
      toast.success("New Product has been added successfully ~");
      dispatch(actProductGetAsync());
    } else {
      // toast.error("Post Product to fail");
    }
  };
}

export function actProductPutAsync(id, data, token) {
  return async (dispatch) => {
    const response = await ProductServices.putUpdateProduct(id, data, token);
    if (response.status === 200 || response.status === 201) {
      toast.success("New Product has been update successfully ~");
      dispatch(actProductGetAsync());
    } else {
      // toast.error("Post Product to fail");
    }
  };
}
