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

export type myProductsData = {
  id: number;
  image: number;
  title: string;
  price: number;
  location: string;
  likes: number;
  chats: number;
  status: string;
  created_at: string;
  updated_At: string;
};

export type myRequestData = {
  product: {
    id: number;
    user: {
      name: string;
      nickname: string;
      email: string;
      location: string;
      range_og_location: string;
    };
    image: number;
    title: string;
    price: number;
    location: string;
    likes: number;
    chats: number;
    status: string;
    created_at: string;
    updated_at: string;
    last_bring_up_my_post: string;
  };
  suggested_price: number;
  accepted: boolean | null;
  updated_at: string;
  created_at: string;
};
