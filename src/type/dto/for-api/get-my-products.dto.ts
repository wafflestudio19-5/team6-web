import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";
import { ProductSimpleWithoutUserDto } from "../product-simple-without-user.dto";

export type GetMyProductsDto = {
  content: ProductSimpleWithoutUserDto[];
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
