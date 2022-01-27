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

export type userInfo = {
  active_location: string;
  active_location_verified: boolean;
  active_range_of_location: string;
  email: string;
  image_url: string;
  inactive_location: string;
  inactive_location_verified: true;
  inactive_range_of_location: string;
  is_active: true;
  name: string;
  nickname: string;
  phone: string;
};
