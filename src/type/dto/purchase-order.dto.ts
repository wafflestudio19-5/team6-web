import { SalesStatus } from "../enum/sales-status";
import { UserDto } from "./user.dto";
import { ProductDto } from "./product.dto";

export type PurchaseOrderDto = {
  created_at: string;
  id: number;
  product: ProductDto[];
  status: SalesStatus;
  suggested_price: number;
  updated_at: string;
  user: UserDto;
};
