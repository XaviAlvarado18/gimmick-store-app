import { defineStore } from "pinia";
import { getCategories, getProductById, getProducts, getProductsByCategory } from "../api/fakestore";
import type { Product } from "../types/fakestore";
import type { Category } from "../types/shop";

type ProductsState = {
  items: Product[];
  categories: Category[];
  selectedCategory: Category | "all";
  query: string;

  loadingList: boolean;
  errorList: string | null;

  loadingDetail: boolean;
  errorDetail: string | null;
  detail: Product | null;
};

export const useProductsStore = defineStore("products", {
  state: (): ProductsState => ({
    items: [],
    categories: [],
    selectedCategory: "all",
    query: "",

    loadingList: false,
    errorList: null,

    loadingDetail: false,
    errorDetail: null,
    detail: null,
  }),

  getters: {
    filtered(state): Product[] {
      const q = state.query.trim().toLowerCase();
      return state.items.filter((p) => (q ? p.title.toLowerCase().includes(q) : true));
    },
  },

  actions: {
    setQuery(v: string) {
      this.query = v;
    },
    setCategory(cat: Category | "all") {
  this.selectedCategory = cat;
},


    async fetchCategories() {
      try {
        this.categories = await getCategories();
      } catch {
        this.categories = [];
      }
    },

    async fetchList() {
      this.loadingList = true;
      this.errorList = null;

      try {
        if (this.selectedCategory === "all") {
          this.items = await getProducts();
        } else {
          this.items = await getProductsByCategory(this.selectedCategory);
        }
      } catch (e: any) {
        this.errorList = "No se pudieron cargar los productos. Intenta de nuevo.";
      } finally {
        this.loadingList = false;
      }
    },

    async fetchDetail(id: number) {
      this.loadingDetail = true;
      this.errorDetail = null;
      this.detail = null;

      try {
        this.detail = await getProductById(id);
      } catch {
        this.errorDetail = "No se pudo cargar el detalle del producto.";
      } finally {
        this.loadingDetail = false;
      }
    },
  },
});
