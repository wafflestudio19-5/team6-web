import { useEffect, useState, Dispatch } from "react";
import requester from "../requester";
import Product from "./Product";
import { myProductsContent, rawProductsData } from "../../type/product";
import Image from "../Image/Image";

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
  const [products, setProducts] = useState<rawProductsData>([]);
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
        res.data.content.map((article: myProductsContent) => {
          Image.getImage(article.image).then((res) => {
            const tempState = {
              data: article,
              url: res.data.url,
            };
            setProducts([tempState]);
          });
        });
      } else {
        res.data.content.forEach((article: myProductsContent) => {
          Image.getImage(article.image).then((res) => {
            const tempState = {
              data: article,
              url: res.data.url,
            };
            setProducts((prevState) => {
              return prevState.concat(tempState);
            });
          });
        });
      }
      setHasMore(!res.data.last);
      console.log(products);
    });
  }, [pageNumber, searched]);
  return { products, hasMore };
}
