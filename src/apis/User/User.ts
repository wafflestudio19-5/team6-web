import requester from "../requester";

export default {
  getMe() {
    return requester("/users/me/");
  },
  patchMyLocation(parameter: "alter" | "verify") {
    return requester({
      url: "/users/me/location/",
      method: "patch",
      data: parameter,
      headers: { "Content-Type": "text/plain" },
    });
  },
};
