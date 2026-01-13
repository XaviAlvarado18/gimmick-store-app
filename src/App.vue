<template>
  <div class="min-h-screen bg-linear-to-b from-zinc-200 via-zinc-100 to-zinc-200">
    <Navbar v-model="query" :cartCount="cartCount" />

    <main class="mx-auto max-w-6xl px-4">
      <!-- buscador grande centrado -->
      <section class="py-10">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="query"
              class="w-full h-12 rounded-full bg-white/80 border border-white shadow-sm pl-6 pr-14 text-zinc-800 outline-none"
              placeholder="Search products by name..."
            />
            <button class="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-12 rounded-full bg-sky-500/80 hover:bg-sky-500 text-white">
              🔍
            </button>
          </div>
        </div>
      </section>

      <section class="pb-10 flex flex-col md:flex-row gap-6">
        <CategorySidebar :selected="selected" @update:selected="selected = $event" />

        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="p in filtered"
              :key="p.id"
              :product="p"
              @add="addToCart"
            />
          </div>

          <p v-if="filtered.length === 0" class="text-zinc-600 mt-8">
            No products found.
          </p>
        </div>
      </section>
    </main>

    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CategorySidebar from "./components/CategorySidebar.vue";
import FooterBar from "./components/FooterBar.vue";
import Navbar from "./components/Navbar.vue";
import ProductCard from "./components/ProductCard.vue";

import { products } from "./data/products";
import type { Category } from "./types/shop";

const query = ref("");
const selected = ref<Category>("all");

// carrito simple: solo cuenta cantidad
const cart = ref<number[]>([]);
const cartCount = computed(() => cart.value.length);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();

  return products.filter((p) => {
    const matchCategory = selected.value === "all" || p.category === selected.value;
    const matchQuery = q === "" || p.title.toLowerCase().includes(q);
    return matchCategory && matchQuery;
  });
});

function addToCart(id: number) {
  cart.value.push(id);
}
</script>
