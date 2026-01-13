export type Category =
  | "all"
  | "electronics"
  | "jewelry"
  | "men's clothing"
  | "women's clothing";

export type Product = {
  id: number;
  title: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
};
