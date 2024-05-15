import { defineStore } from "pinia";

import * as api from "~/shared/api/orders/orders";

import type { Order } from "../api/orders/orders.types";

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    orders: [] as Order[]
  }),
  actions: {
    async getOrders() {
      const orders = await api.getOrders();
      this.orders = orders;
    }
  }
});
