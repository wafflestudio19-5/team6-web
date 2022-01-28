import { PurchaseOrderDto } from "../purchase-order.dto";
import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";

export type GetPurchaseOrdersDto = {
  content: PurchaseOrderDto;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: boolean;
  number_of_elements: number;
  pageable: PageableDto;
  size: number;
  sort: SortDto;
  total_elements: number;
  total_pages: number;
};
