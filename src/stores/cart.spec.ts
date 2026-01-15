import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "./cart";

describe("useCartStore", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it("starts empty", () => {
    const cart = useCartStore();
    expect(cart.items).toEqual([]);
    expect(cart.count).toBe(0);
  });

  it("adds items and increases count", () => {
    const cart = useCartStore();
    cart.add(1);
    cart.add(1);
    cart.add(2);

    expect(cart.qtyByProduct(1)).toBe(2);
    expect(cart.qtyByProduct(2)).toBe(1);
    expect(cart.count).toBe(3);
  });

  it("decrements and removes when qty reaches 0", () => {
    const cart = useCartStore();
    cart.add(1, 1);
    cart.dec(1);

    expect(cart.qtyByProduct(1)).toBe(0);
    expect(cart.items.length).toBe(0);
    expect(cart.count).toBe(0);
  });

  it("clears cart", () => {
    const cart = useCartStore();
    cart.add(1, 3);
    cart.clear();

    expect(cart.count).toBe(0);
    expect(cart.items).toEqual([]);
  });
});
