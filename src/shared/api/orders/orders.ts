import type { Order, OrdersResponse } from "./orders.types";

import { internalAPIFetch } from "../internal/instance";

export const getOrders = async (): Promise<Order[]> => {
  const response = await internalAPIFetch<OrdersResponse>("/orders.getTest", {
    method: "GET"
  });
  return response.response.data.orders;
};
