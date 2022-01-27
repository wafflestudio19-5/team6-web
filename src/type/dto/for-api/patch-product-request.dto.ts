import { Category } from "../../enum/category";
import { ForAge } from "../../enum/for-age";
import { RangeOfLocation } from "../../enum/range-of-location";

export type PatchProductRequestDto = {
  category?: Category;
  content?: string;
  for_age?: ForAge;
  image_urls?: string[];
  negotiable?: boolean;
  price?: number;
  range_of_location?: RangeOfLocation;
  title?: string;
};
