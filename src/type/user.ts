export type TUserInfo = {
  name: string;
  nickname: string;
  image_url: string | null;
  is_active: boolean;
  phone: string;
  email: string;
  location: string;
  range_of_location: string;
};

export type TUserInfoV2 = {
  active_location: string;
  active_location_verified: boolean;
  active_range_of_location: string;
  email: string;
  image_url: string;
  inactive_location: string;
  inactive_location_verified: boolean;
  inactive_range_of_location: string;
  is_active: boolean;
  name: string;
  nickname: string;
  phone: string;
};
