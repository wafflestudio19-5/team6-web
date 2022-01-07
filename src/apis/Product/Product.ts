import requester from "../requester";

export default {
  getAllProducts(pageNumber: number) {
    return requester({
      url: `/products/?pageNumber=${pageNumber}&pageSize=15`,
    });
  },
  getProduct(id: string) {
    return requester({
      url: `/products/${id}/`,
    });
  },
  postProduct(data: {
    images: number[];
    title: string;
    content: string;
    price: number;
    negotiable: boolean;
    category: number;
    for_age: number | null;
    range_of_location: number;
  }) {
    return requester({
      method: "POST",
      url: "/products/",
      data: data,
    });
  },
  patchProduct(
    id: string,
    data: {
      images: number[];
      title: string;
      content: string;
      price: number;
      negotiable: boolean;
      category: number;
      for_age: number | null;
      range_of_location: number;
    }
  ) {
    return requester({
      method: "PATCH",
      url: `/products/${id}/`,
      data: data,
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
