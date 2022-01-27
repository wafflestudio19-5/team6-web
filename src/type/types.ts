import { TUserInfo } from "./user";

export type articleData = {
  id: number;
  user: TUserInfo;
  image_urls: string[];
  title: string;
  content: string;
  price: number;
  location: string;
  category: string;
  hit: number;
  likes: number;
  chats: number;
  price_suggestions: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_bring_up_my_post: string;
  negotiable: boolean;
  for_age: (
    | "ZERO_TO_SIX_MONTH"
    | "SEVEN_TO_TWELVE_MONTH"
    | "OVER_ONE_TO_TWO"
    | "THREE_TO_FIVE"
    | "SIX_TO_EIGHT"
    | "OVER_NINE"
  )[];
  range_of_location: string;
}; // 개별 판매글

export type productType = {
  id: number;
  user: TUserInfo;
  image_url: string;
  title: string;
  price: number;
  location: string;
  likes: number;
  chats: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_bring_up_my_post: string;
}; // 메인 페이지 개별 판매글

export type myRequestData = {
  product: productType;
  suggested_price: number;
  message: string;
  last_message_time: string | null;
  accepted: boolean | null;
  updated_at: string;
  created_at: string;
};

export type otherRequestType = {
  id: number;
  user: TUserInfo;
  product: productType;
  suggested_price: number;
  message: string;
  last_message_time: string;
  accepted: boolean;
  updated_at: string;
  created_At: string;
};
