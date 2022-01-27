import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";
import { ProductSimpleDto } from "../product-simple.dto";

export type GetProductsDto = {
  content: ProductSimpleDto[];
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
