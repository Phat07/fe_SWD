import { API } from "./api";

export const RequestServices = {
  getAllRequestByUserId(id, token) {
    return API.get(`/report_requests/getRequest/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
