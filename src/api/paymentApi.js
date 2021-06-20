import { api } from "./Api";

export const postClientCardInfo = (clientCard) => {
  return api.post("/subscription", clientCard);
};
