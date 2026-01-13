<template>
  <AppShell>
    <div v-if="products.loadingDetail" class="bg-white/70 border border-white rounded-2xl p-6">
      <div class="h-6 w-1/2 bg-zinc-200 rounded mb-4"></div>
      <div class="h-40 bg-zinc-200 rounded mb-4"></div>
      <div class="h-4 bg-zinc-200 rounded mb-2"></div>
      <div class="h-4 bg-zinc-200 rounded mb-2"></div>
    </div>

    <div v-else-if="products.errorDetail" class="bg-white/70 border border-white rounded-xl p-4">
      <p class="text-zinc-700">{{ products.errorDetail }}</p>
    </div>

    <div v-else-if="products.detail" class="bg-white/70 border border-white rounded-2xl p-6 flex flex-col md:flex-row gap-6">
      <div class="md:w-1/2 bg-white rounded-2xl border border-zinc-100 grid place-items-center p-6">
        <img :src="products.detail.image" :alt="products.detail.title" class="max-h-80 object-contain" />
      </div>

      <div class="flex-1">
        <h1 class="text-2xl font-semibold text-zinc-800">{{ products.detail.title }}</h1>
        <p class="text-sm text-zinc-500 mt-1">Category: {{ products.detail.category }}</p>

        <div class="mt-3 flex items-center gap-3">
          <span class="text-xl font-semibold text-zinc-800">${{ products.detail.price.toFixed(2) }}</span>
          <span class="text-sm text-zinc-600">
            ⭐ {{ products.detail.rating.rate }} ({{ products.detail.rating.count }})
          </span>
        </div>

        <p class="mt-4 text-zinc-700 leading-relaxed">
          {{ products.detail.description }}
        </p>

        <button
          class="mt-6 h-11 px-6 rounded-full bg-sky-500/80 hover:bg-sky-500 text-white font-medium cursor-pointer"
          :class="added ? 'opacity-70' : ''"
          @click="add()"
        >
          {{ added ? "Added ✔" : "Add to Cart" }}
        </button>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import AppShell from "../components/layout/AppShell.vue";
import { useCartStore } from "../stores/cart";
import { useProductsStore } from "../stores/products";

const route = useRoute();
const products = useProductsStore();
const cart = useCartStore();

const added = ref(false);

async function load() {
  const id = Number(route.params.id);
  if (!Number.isFinite(id)) return;
  await products.fetchDetail(id);
  added.value = false;
}

onMounted(load);
watch(() => route.params.id, load);

function add() {
  if (!products.detail) return;
  cart.add(products.detail.id, 1);
  added.value = true;
  setTimeout(() => (added.value = false), 900);
}
</script>
