<template>
  <div class="bg-white/70 border border-white rounded-2xl p-4 flex gap-4 items-center">
    <img :src="product.image" class="h-16 w-16 object-contain bg-white rounded-xl border border-zinc-100 p-2" />

    <div class="flex-1">
      <p class="font-semibold text-zinc-800 line-clamp-2">{{ product.title }}</p>
      <p class="text-sm text-zinc-600 mt-1">${{ product.price.toFixed(2) }}</p>
    </div>

    <div class="flex items-center gap-2">
      <button class="h-9 w-9 rounded-full bg-white border border-zinc-200 cursor-pointer" @click="$emit('dec')">−</button>
      <span class="w-8 text-center font-semibold text-zinc-800">{{ qty }}</span>
      <button class="h-9 w-9 rounded-full bg-white border border-zinc-200 cursor-pointer" @click="$emit('inc')">+</button>
    </div>

    <button class="ml-2 h-9 px-4 rounded-full bg-red-500/90 hover:bg-red-500 text-white cursor-pointer" @click="$emit('remove')">
      Remove
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "../../types/fakestore";
defineProps<{ product: Product; qty: number }>();
defineEmits<{ (e: "inc"): void; (e: "dec"): void; (e: "remove"): void }>();
</script>

<style scoped>
.line-clamp-2{
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
