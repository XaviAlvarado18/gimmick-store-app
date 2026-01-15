<template>
  <aside
    class="w-full md:w-64 self-start
           rounded-2xl bg-white/80 backdrop-blur
           border border-black/5 shadow-sm
           p-5"
  >
    <h2 class="text-xl font-semibold text-zinc-800 mb-4">Categories</h2>

    <div class="flex flex-col gap-3">
      <button
        v-for="c in categories"
        :key="c.value"
        class="w-full px-4 py-3 text-sm
               flex items-center justify-between
               rounded-xl border
               transition"
        :class="c.value === selected
          ? 'bg-red-50 border-red-100 text-red-700'
          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'"
        @click="$emit('update:selected', c.value)"
      >
        <span class="capitalize">{{ c.label }}</span>

        <span class="flex items-center gap-2">
          <!-- Check rojo como la imagen (en vez de ✅) -->
          <span
            v-if="c.value === selected"
            class="inline-flex items-center justify-center
                   w-5 h-5 rounded-full bg-red-600 text-white text-[11px]"
          >
            ✓
          </span>

          <!-- Flecha a la derecha -->
          <span class="text-zinc-500 text-xs">▾</span>
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Category } from "../types/shop";

defineProps<{ selected: Category }>();

defineEmits<{
  (e: "update:selected", v: Category): void;
}>();

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
];
</script>
