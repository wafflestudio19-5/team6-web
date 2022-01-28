import { RangeOfLocation } from "../enum/range-of-location";

export type UserDto = {
  email: string;
  image_url?: string;
  name: string;
  nickname: string;
  phone: string;
  first_location?: string;
  first_range_of_location?: RangeOfLocation;
  first_location_verified: boolean;
  second_location?: string;
  second_range_of_location?: RangeOfLocation;
  second_location_verified: boolean;
  is_active: boolean;
  is_first_location_active: boolean;
  is_first: boolean;
};
