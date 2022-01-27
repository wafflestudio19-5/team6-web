import { LikeDto } from "../like.dto";
import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";
import { ProductDto } from "../product.dto";

export type GetMyLikesDto = {
  content: ProductDto[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  number_of_elements: number;
  pageable: PageableDto;
  size: number;
  sort: SortDto;
  total_elements: number;
  total_pages: number;
};
