import { Category } from "../../enum/category";
import { ForAge } from "../../enum/for-age";

export type PostProductRequestDto = {
  category: Category;
  content: string;
  for_age: ForAge;
  image_url: string[];
  negotiable: boolean;
  price: number;
  range_of_location: number;
  title: string;
};
