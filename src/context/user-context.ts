import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserDto } from "../type/dto/user.dto";

export const UserStateContext = React.createContext<UserDto | undefined>(
  undefined
);
export const UserDispatchContext = React.createContext<
  Dispatch<SetStateAction<UserDto | undefined>> | undefined
>(undefined);

export function useUserState() {
  return useContext(UserStateContext);
}

export function useUserDispatch(): Dispatch<
  SetStateAction<UserDto | undefined>
> {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("User Context Provider not found");
  return dispatch;
}
