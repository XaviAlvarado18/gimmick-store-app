<template>
  <aside class="w-full md:w-56">
    <h2 class="text-xl font-semibold text-zinc-700 mb-4">Categories</h2>

    <div class="flex md:flex-col gap-2 flex-wrap">
      <button
        v-for="c in categories"
        :key="c.value"
        class="px-4 py-2 rounded-full text-sm flex items-center gap-2 border transition"
        :class="c.value === selected
          ? 'bg-emerald-100 border-emerald-200 text-emerald-900'
          : 'bg-white/60 border-white text-zinc-700 hover:bg-white'"
        @click="$emit('update:selected', c.value)"
      >
        <span class="capitalize">{{ c.label }}</span>
        <span v-if="c.value === selected">✅</span>
        <span v-else class="opacity-60">▾</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Category } from "../types/shop";

defineProps<{
  selected: Category;
}>();

defineEmits<{
  (e: "update:selected", v: Category): void;
}>();

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "electronics", value: "electronics" },
  { label: "jewelry", value: "jewelry" },
  { label: "men's clothing", value: "men's clothing" },
  { label: "women's clothing", value: "women's clothing" },
];
</script>
