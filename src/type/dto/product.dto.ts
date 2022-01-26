import { Category } from "../enum/category";
import { ForAge } from "../enum/for-age";
import { RangeOfLocation } from "../enum/range-of-location";
import { SalesStatus } from "../enum/sales-status";
import { UserDto } from "./user.dto";

export type ProductDto = {
  category: Category;
  chats: number;
  content: string;
  created_at: string;
  for_age: ForAge[];
  hit: number;
  id: number;
  image_urls: string[];
  last_bring_up_my_post: string;
  likes: number;
  location: string;
  negotiable: boolean;
  price: number;
  price_suggestions: number;
  range_of_location: RangeOfLocation;
  status: SalesStatus;
  title: string;
  updated_at: string;
  user: UserDto;
};
