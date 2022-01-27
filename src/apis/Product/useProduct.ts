import { useEffect, useState, Dispatch } from "react";
import Product from "./Product";
import Image from "../Image/Image";
import { productType } from "../../type/types";

type TSearchProduct = {
  pageNumber: number;
  title?: string;
  rangeOfLocation?: number;
  categories?: number;
  minPrice?: number;
  maxPrice?: number;
  searched?: boolean;
};

export default function useProduct({
  title,
  rangeOfLocation,
  categories,
  minPrice,
  maxPrice,
  pageNumber,
  searched,
}: TSearchProduct) {
  const [products, setProducts] = useState<productType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    Product.getAllProducts(
      pageNumber,
      title,
      categories,
      minPrice,
      maxPrice,
      rangeOfLocation
    ).then((res) => {
      setProducts((prevState) => {
        return prevState.concat(res.data.content);
      });
      setHasMore(!res.data.last);
    });
  }, [pageNumber]);
  return { products, hasMore };
}
