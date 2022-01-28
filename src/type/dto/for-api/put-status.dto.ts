import { ProductStatusAction } from "../../enum/product-status-action";

export type PutStatusDto = {
  action: ProductStatusAction;
};
