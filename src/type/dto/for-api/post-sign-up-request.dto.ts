import { RangeOfLocation } from "../../enum/range-of-location";

export type PostSignUpRequestDto = {
  email: string;
  location: string;
  name: string;
  nickname: string;
  password: string;
  phone: string;
  range_of_location: RangeOfLocation;
};
