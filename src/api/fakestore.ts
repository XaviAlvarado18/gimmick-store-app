import type { Product } from "../types/fakestore";
import { http } from "./http";

export async function getProducts(): Promise<Product[]> {
  const { data } = await http.get<Product[]>("/products");
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await http.get<string[]>("/products/categories");
  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data } = await http.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  return data;
}

/**
 * (Opcional) Checkout demo usando endpoint carts.
 */
export async function postCart(payload: {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}) {
  const { data } = await http.post("/carts", payload);
  return data;
}
