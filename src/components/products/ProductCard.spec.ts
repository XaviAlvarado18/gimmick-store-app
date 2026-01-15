import { fireEvent, render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import type { Product } from "../../types/fakestore";
import type { Category } from "../../types/shop";
import ProductCard from "./ProductCard.vue";

const product : Product = {
  id: 1,
  title: "Test Product",
  price: 10,
  description: "desc",
  category: "electronics" as Category,
  image: "https://example.com/img.png",
  rating: { rate: 4.5, count: 10 },
};

describe("ProductCard", () => {
  it("emits open when clicking the card", async () => {
    const { container, emitted } = render(ProductCard, {
      props: { product },
    });

    await fireEvent.click(container.querySelector("article")!);

    expect(emitted()).toHaveProperty("open");
    expect(emitted().open!.length).toBe(1);
  });

  it("emits add when clicking Add to Cart and does NOT emit open", async () => {
    const { getByText, emitted } = render(ProductCard, {
      props: { product },
    });

    await fireEvent.click(getByText("Add to Cart"));

    expect(emitted()).toHaveProperty("add");
    expect(emitted().add![0]).toEqual([1]);

    // Por el @click.stop, no debería abrir detalle
    expect(emitted().open).toBeUndefined();
  });
});
