<template>
  <article
    class="bg-white/70 backdrop-blur rounded-2xl shadow-sm border border-white overflow-hidden
           cursor-pointer hover:shadow-md transition-shadow"
    @click="$emit('open')"
  >
    <div class="p-4">
      <div class="relative bg-white rounded-xl border border-zinc-100 h-40 grid place-items-center overflow-hidden">
        <img :src="product.image" :alt="product.title" class="h-full w-full object-contain p-3" />

        <!-- Puedes eliminar este botón si ya no lo quieres -->
        <button
          class="absolute top-2 right-2 h-7 w-7 rounded-lg bg-zinc-100 grid place-items-center text-xs"
          title="Quick view"
          @click.stop="$emit('open')"
        >
          ▣
        </button>
      </div>

      <div class="mt-3">
        <h3 class="font-semibold text-zinc-800 line-clamp-1">
          {{ product.title }}
        </h3>

        <div class="mt-1 flex items-center justify-between text-sm">
          <span class="text-zinc-500" v-if="product.originalPrice">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
          <span class="ml-auto p-2 font-semibold text-zinc-700">
            ${{ product.price.toFixed(2) }}
          </span>
        </div>

        <button
          class="w-full py-2 bg-[#BD2C2D] text-white rounded-lg font-semibold hover:bg-[#A31D1D] transition-colors cursor-pointer"
          @click.stop="$emit('add', product.id)"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from "../../types/shop";

defineProps<{ product: Product }>();

defineEmits<{
  (e: "add", id: number): void;
  (e: "open"): void;
}>();
</script>

<style scoped>
.line-clamp-1{
  display: -webkit-box;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
