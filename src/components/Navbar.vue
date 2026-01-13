<template>
  <header class="w-full bg-zinc-900 text-white">
    <div class="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
      <div class="flex items-center gap-2 font-semibold">
        <div class="h-7 w-7 rounded-lg bg-white/10 grid place-items-center">≋</div>
        <span>ShopWave</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm text-white/80 ml-10">
        <a class="hover:text-white" href="#">Home</a>
        <a class="hover:text-white" href="#">Categories</a>
        <a class="hover:text-white" href="#">About</a>
      </nav>

      <div class="ml-auto flex items-center gap-3 w-full md:w-auto">
        <div class="relative w-full md:w-[420px]">
          <input
            class="w-full h-9 rounded-lg bg-white text-zinc-900 pl-10 pr-10 text-sm outline-none"
            placeholder="Search"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔎</span>
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">🛒</span>
        </div>

        <button class="hidden md:inline-flex relative h-9 w-9 rounded-lg bg-white/10 items-center justify-center">
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  cartCount: number;
}>();

defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
</script>
