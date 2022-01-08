import requester from "../requester";

export default {
  getImage(id: number) {
    return requester({ url: `/images/${id}/` });
  },
};
