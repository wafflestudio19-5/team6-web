import { SalesStatus } from "../enum/sales-status";
import { UserDto } from "./user.dto";
import { ProductDto } from "./product.dto";
import { RequestStatus } from "../enum/request-status";

export type PurchaseOrderDto = {
  created_at: string;
  id: number;
  product: ProductDto;
  status: RequestStatus;
  suggested_price: number;
  updated_at: string;
  user: UserDto;
};
