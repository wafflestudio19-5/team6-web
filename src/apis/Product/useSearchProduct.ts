import { useEffect, useState, Dispatch, SetStateAction } from "react";
import requester from "../requester";
import Product from "./Product";
import Image from "../Image/Image";
import { productType } from "../../type/types";

type TSearchProduct = {
  pageNumber: number;
  title: string;
  rangeOfLocation: number;
  categories: number[];
  minPrice: number | string;
  maxPrice: number | string;
  searched: boolean;
  filtered: boolean;
  setFiltered: Dispatch<SetStateAction<boolean>>;
};

export default function useSearchProduct({
  title,
  rangeOfLocation,
  categories,
  minPrice,
  maxPrice,
  pageNumber,
  searched,
  filtered,
  setFiltered,
}: TSearchProduct) {
  const [products, setProducts] = useState<productType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    if (!!title)
      Product.getAllProducts(
        pageNumber,
        title,
        categories,
        minPrice,
        maxPrice,
        rangeOfLocation
      ).then((res) => {
        if (!searched || filtered) {
          setProducts([]);
          setFiltered(false);
          console.log(1);
        } else {
          setProducts((prevState) => {
            return prevState.concat(res.data.content);
          });
          console.log(3);
        }
        setHasMore(!res.data.last);
      });
  }, [pageNumber, searched, title, filtered]);
  console.log(searched, filtered);
  return { products, hasMore };
}
