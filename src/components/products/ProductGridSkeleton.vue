<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="n in 9" :key="n" class="bg-white/70 border border-white rounded-2xl p-4">
      <div class="h-40 bg-zinc-200 rounded-xl"></div>
      <div class="mt-3 h-4 bg-zinc-200 rounded w-3/4"></div>
      <div class="mt-2 h-4 bg-zinc-200 rounded w-1/2"></div>
      <div class="mt-3 h-10 bg-zinc-200 rounded-full"></div>
    </div>
  </div>
</template>
