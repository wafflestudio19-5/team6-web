import requester from "../requester";

export default {
  getAllProducts() {
    return requester({
      url: `/products/?pageNumber=0&pageSize=15`,
    });
  },
  getProduct(id: string) {
    return requester({
      url: `/products/${id}/`,
    });
  },
  putStatus(id: string, action: string) {
    return requester({
      method: "PUT",
      url: `/products/${id}/status/`,
      data: {
        action: action,
      },
    });
  },
  deleteProduct(id: string) {
    return requester({
      method: "DELETE",
      url: `/products/${id}/`,
    });
  },
};
