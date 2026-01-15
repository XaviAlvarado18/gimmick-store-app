import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import CartPage from "./CartPage.vue";
import { useCartStore } from "../stores/cart";

// Mock AppShell para simplificar
vi.mock("../components/layout/AppShell.vue", () => ({
  default: { template: "<div><slot /></div>" },
}));

// ✅ Mock del router
const pushMock = vi.fn();
vi.mock("vue-router", async () => {
  const actual: any = await vi.importActual("vue-router");
  return {
    ...actual,
    useRouter: () => ({ push: pushMock }),
  };
});

describe("CartPage", () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
    pushMock.mockClear();
  });

  it("clears cart and redirects home on checkout", async () => {
    const cart = useCartStore();
    cart.add(1, 2);

    const { getByText } = render(CartPage, {
      global: {
        stubs: {
          RouterLink: { template: "<a><slot /></a>" },
        },
      },
    });


    await fireEvent.click(getByText("Complete Purchase"));

    expect(cart.count).toBe(0);
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
