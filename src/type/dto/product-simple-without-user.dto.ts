import { SalesStatus } from "../enum/sales-status";

export type ProductSimpleWithoutUserDto = {
  chats: number;
  created_at: string;
  id: number;
  image_url: string;
  last_bring_up_my_post: string;
  likes: number;
  location: string;
  price: number;
  status: SalesStatus;
  title: string;
  updated_at: string;
};
