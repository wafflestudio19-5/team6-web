import { RangeOfLocation } from "../enum/range-of-location";

export type UserDto = {
  email: string;
  image_url?: string;
  name: string;
  nickname: string;
  phone: string;
  active_location?: string;
  active_range_of_location?: RangeOfLocation;
  active_location_verified: boolean;
  inactive_location?: string;
  inactive_range_of_location?: RangeOfLocation;
  inactive_location_verified: boolean;
  is_active: boolean;
};
