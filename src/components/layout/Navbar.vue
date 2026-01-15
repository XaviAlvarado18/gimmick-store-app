<template>
  <header class="w-full bg-slate-50 text-black/90 shadow-md">
    <div class="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
      <RouterLink to="/" class="flex items-center gap-2 font-semibold pt-2">
        <img src="/src/assets/gimmick.png" alt="Gimmick Logo" class="h-12 md:h-16 w-auto object-contain" />
      </RouterLink>


        <nav class="hidden md:flex items-center gap-8 text-sm text-black/90 font-semibold ml-10">
          <RouterLink class="hover:text-dark" to="/">Home</RouterLink>
          <RouterLink class="hover:text-dark" to="/cart">Cart</RouterLink>
        </nav>


      <div class="ml-auto flex items-center gap-3 w-full md:w-auto">
        <div class="relative flex items-center w-full md:w-105">
          <span class="absolute left-3 text-[#BD2C2D]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input
            class="w-full h-9 rounded-lg bg-white border border-zinc-300 text-zinc-900 pl-10 pr-10 text-sm outline-none focus:border-[#BD2C2D] transition-colors"
            placeholder="Search"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <RouterLink
          to="/cart"
          class="ml-auto inline-flex relative h-9 w-9 rounded-lg bg-white/10 items-center justify-center hover:bg-white/20 cursor-pointer"
          title="Cart"
        >
          🛒
          <span
            v-if="cartCount > 0"
            class="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5"
          >
            {{ cartCount }}
          </span>
        </RouterLink>
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
