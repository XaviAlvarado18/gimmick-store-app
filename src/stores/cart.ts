import { defineStore } from "pinia";
import type { CartItem, Product } from "../types/fakestore";
import { loadJSON, saveJSON } from "../utils/storage";

const LS_KEY = "cart_v1";

type CartState = {
  items: CartItem[];
};

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: loadJSON<CartItem[]>(LS_KEY, []),
  }),

  getters: {
    count: (s) => s.items.reduce((acc, it) => acc + it.qty, 0),

    qtyByProduct: (s) => (productId: number) =>
      s.items.find((i) => i.productId === productId)?.qty ?? 0,

    totalFromProducts: (s) => (products: Product[]) => {
      const map = new Map(products.map((p) => [p.id, p.price]));
      return s.items.reduce((acc, it) => acc + (map.get(it.productId) ?? 0) * it.qty, 0);
    },
  },

  actions: {
    persist() {
      saveJSON(LS_KEY, this.items);
    },

    add(productId: number, qty = 1) {
      const found = this.items.find((i) => i.productId === productId);
      if (found) found.qty += qty;
      else this.items.push({ productId, qty });

      this.persist();
    },

    inc(productId: number) {
      this.add(productId, 1);
    },

    dec(productId: number) {
      const found = this.items.find((i) => i.productId === productId);
      if (!found) return;

      found.qty -= 1;
      if (found.qty <= 0) this.items = this.items.filter((i) => i.productId !== productId);

      this.persist();
    },

    remove(productId: number) {
      this.items = this.items.filter((i) => i.productId !== productId);
      this.persist();
    },

    clear() {
      this.items = [];
      this.persist();
    },
  },
});
