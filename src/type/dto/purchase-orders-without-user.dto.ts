import { ProductSimpleDto } from "./product-simple.dto";
import { SalesStatus } from "../enum/sales-status";
import { RequestStatus } from "../enum/request-status";

export type PurchaseOrdersWithoutUserDto = {
  created_at: string;
  id: number;
  product: ProductSimpleDto;
  status: RequestStatus;
  suggested_price: number;
  updated_at: string;
};
