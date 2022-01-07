import requester from "../requester";

export default {
  getMe() {
    return requester("/users/me/");
  },
};
