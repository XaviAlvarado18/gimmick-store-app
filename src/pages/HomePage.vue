<template>
  <div class="min-h-screen bg-linear-to-b from-zinc-200 via-zinc-100 to-zinc-200">
    <Navbar v-model="productsStore.query" :cartCount="cartStore.count" />

    <main class="mx-auto max-w-6xl px-4">
      <section class="py-5">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              :value="productsStore.query"
              @input="productsStore.setQuery(($event.target as HTMLInputElement).value)"
              class="w-full h-12 rounded-full bg-white/80 border border-white shadow-sm pl-6 pr-14 text-zinc-800 outline-none"
              placeholder="Search products by name..."
            />
            <button
              class="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-12 rounded-full bg-sky-500/80 hover:bg-sky-500 text-white cursor-pointer"
            >
              🔍
            </button>
          </div>
        </div>
      </section>

      <section class="pb-10 flex flex-col md:flex-row gap-6">
        <CategorySidebar
          :selected="productsStore.selectedCategory"
          @update:selected="onSelectCategory"
        />

        <div class="flex-1">

            <!-- Skeleton -->
            <ProductGridSkeleton v-if="productsStore.loadingList" />

            <!-- Error -->
            <div
                v-else-if="productsStore.errorList"
                class="bg-white/70 border border-white rounded-xl p-4"
            >
                <p class="text-zinc-700">{{ productsStore.errorList }}</p>
                <button
                class="mt-3 px-4 py-2 rounded-full bg-zinc-900 text-white cursor-pointer"
                @click="productsStore.fetchList()"
                >
                Reintentar
                </button>
            </div>

          <div v-else-if="productsStore.errorList" class="text-zinc-700">
            {{ productsStore.errorList }}
            <button class="ml-3 underline" @click="productsStore.fetchList()">Reintentar</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="p in productsStore.filtered"
              :key="p.id"
              :product="p"
              @add="cartStore.add(p.id)"
              @open="goDetail(p.id)"
            />
          </div>

          <p v-if="!productsStore.loadingList && !productsStore.errorList && productsStore.filtered.length === 0"
             class="text-zinc-600 mt-8">
            No products found.
          </p>
        </div>
      </section>
    </main>

    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import CategorySidebar from "../components/CategorySidebar.vue";
import FooterBar from "../components/layout/FooterBar.vue";
import Navbar from "../components/layout/Navbar.vue";
import ProductCard from "../components/products/ProductCard.vue";
import ProductGridSkeleton from "../components/products/ProductGridSkeleton.vue";

import { useCartStore } from "../stores/cart";
import { useProductsStore } from "../stores/products";
import type { Category } from "../types/shop";

const router = useRouter();
const cartStore = useCartStore();
const productsStore = useProductsStore();

onMounted(async () => {
  await productsStore.fetchCategories(); // para filtros reales desde API
  await productsStore.fetchList();
});

async function onSelectCategory(cat: Category | "all") {
  productsStore.setCategory(cat);
  await productsStore.fetchList();
}

function goDetail(id: number) {
  router.push({ name: "product", params: { id } });
}
</script>
