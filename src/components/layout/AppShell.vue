<template>
  <div class="min-h-screen bg-linear-to-b from-zinc-200 via-zinc-100 to-zinc-200">
    <Navbar />
    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import FooterBar from "./FooterBar.vue";
import Navbar from "./Navbar.vue";
</script>
