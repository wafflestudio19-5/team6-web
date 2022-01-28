import { useEffect, useState, Dispatch } from "react";
import Product from "./Product";
import Image from "../Image/Image";
import { productType } from "../../type/types";

type TSearchProduct = {
  pageNumber: number;
  searched?: boolean;
};

export default function useProduct({ pageNumber, searched }: TSearchProduct) {
  const [products, setProducts] = useState<productType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  console.log(products);

  useEffect(() => {
    Product.getAllProducts(pageNumber).then((res) => {
      setProducts((prevState) => {
        return prevState.concat(res.data.content);
      });
      setHasMore(!res.data.last);
    });
  }, [pageNumber]);
  return { products, hasMore };
}
