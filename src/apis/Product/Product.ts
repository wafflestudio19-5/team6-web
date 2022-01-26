import requester from "../requester";

export default {
  getAllProducts(
    pageNumber: number,
    title?: string,
    category?: number,
    minPrice?: number,
    maxPrice?: number,
    rangeOfLocation?: number
  ) {
    const searchParams = new URLSearchParams();
    if (!!title) searchParams.set("title", title);
    if (!!category) searchParams.set("category", category.toString());
    if (!!minPrice) searchParams.set("minPrice", minPrice.toString());
    if (!!maxPrice) searchParams.set("maxPrice", maxPrice.toString());
    if (!!rangeOfLocation || rangeOfLocation === 0)
      searchParams.set("rangeOfLocation", rangeOfLocation.toString());
    return requester({
      url: `/products/?pageNumber=${pageNumber}&pageSize=10&${searchParams.toString()}`,
    });
  },
  getProduct(id: string) {
    return requester({
      url: `/products/${id}/`,
    });
  },
  postProduct(data: {
    image_urls: string[] | null;
    title: string;
    content: string;
    price: number;
    negotiable: boolean;
    category: number;
    for_age: number[] | null;
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
      image_urls: string[] | null;
      title: string;
      content: string;
      price: number;
      negotiable: boolean;
      category: number;
      for_age: number[] | null;
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
