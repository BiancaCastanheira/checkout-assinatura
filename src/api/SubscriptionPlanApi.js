import { api } from "./Api";

export const getSubscriptionPlans = () => {
  return api.get("/offer");
};
