<template>
  <div class="min-h-screen bg-linear-to-b from-zinc-200 via-zinc-100 to-zinc-200">
    <Navbar v-model="search" :cart-count="cartCount"/>
    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FooterBar from "./FooterBar.vue";
import Navbar from "./Navbar.vue";

const search = ref("");
const cartCount = ref(0);
</script>
