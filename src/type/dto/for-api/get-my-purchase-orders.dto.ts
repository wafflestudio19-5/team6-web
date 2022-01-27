import { PurchaseOrdersWithoutUserDto } from "../purchase-orders-without-user.dto";
import { PageableDto } from "../pageable.dto";
import { SortDto } from "../sort.dto";

export type GetMyPurchaseOrdersDto = {
  content: PurchaseOrdersWithoutUserDto[];
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
