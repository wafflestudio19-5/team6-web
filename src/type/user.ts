export type TUserInfo = {
  email: string;
  image_url: string;
  is_active: boolean;
  location: string;
  name: string;
  nickname: string;
  phone: string;
  range_of_location: string;
};

export type TUserInfoV2 = {
  first_location: string;
  first_location_verified: boolean;
  first_range_of_location: string;
  is_first_location_active: boolean;
  email: string;
  image_url: string;
  second_location: string;
  second_location_verified: boolean;
  second_range_of_location: string;
  is_active: boolean;
  name: string;
  nickname: string;
  phone: string;
};
