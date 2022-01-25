import { ProductSimpleDto } from "./product-simple.dto";
import { SalesStatus } from "../enum/sales-status";

export type PurchaseOrdersWithoutUserDto = {
  created_at: string;
  id: number;
  product: ProductSimpleDto[];
  status: SalesStatus;
  suggested_price: number;
  updated_at: string;
};
