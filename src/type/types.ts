export type articleData = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  image: any;
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
  for_age:
    | "ZERO_TO_SIX_MONTH"
    | "SEVEN_TO_TWELVE_MONTH"
    | "OVER_ONE_TO_TWO"
    | "THREE_TO_FIVE"
    | "SIX_TO_EIGHT"
    | "OVER_NINE";
};


export type userType = {
  name: string;
  nickname: string;
  email: string;
  location: string;
  range_of_location: string;
};
export type productType = {
  id: number;
  user: userType;
  image: number[];
  title: string;
  price: number;
  negotiable: boolean;
  category: string;
  for_age: string[];
  location: string;
  range_of_location: string;
  hit: number;
  likes: number;
  chats: number;
  status: string;
  price_suggestions: number;
  created_at: string;
  updated_at: string;
  last_bring_up_my_post: string;
};
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
  user: userType;
  product: productType;
  suggested_price: number;
  message: string;
  last_message_time: string;
  accepted: boolean;
  updated_at: string;
  created_At: string;
};
