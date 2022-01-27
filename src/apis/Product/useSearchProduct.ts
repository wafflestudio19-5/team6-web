import { useEffect, useState, Dispatch } from "react";
import requester from "../requester";
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

export default function useSearchProduct({
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
      if (!searched) {
        setProducts([]);
      } else {
        setProducts((prevState) => {
          return prevState.concat(res.data.content);
        });
      }
      setHasMore(!res.data.last);
    });
  }, [pageNumber, searched]);
  return { products, hasMore };
}
