<template>
  <AppShell>
    <main class="mx-auto max-w-6xl px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-zinc-800 text-center mb-8">
        Shopping Cart
      </h1>

      <!-- Empty state -->
      <div
        v-if="cart.items.length === 0"
        class="bg-white/70 border border-white rounded-2xl p-8 text-center"
      >
        <p class="text-zinc-700">Your cart is empty.</p>
        <RouterLink
          to="/"
          class="inline-flex mt-5 px-5 py-2 rounded-full bg-[#BD2C2D] hover:bg-[#A31D1D] text-white font-semibold"
        >
          Go to the Store
        </RouterLink>
      </div>

      <!-- Cart table/card -->
      <div v-else class="bg-white/70 border border-white rounded-2xl shadow-sm overflow-hidden">
        <!-- Desktop table -->
        <div class="hidden md:block">
          <div class="grid grid-cols-[70px_110px_1fr_140px_220px_140px_70px] items-center
                      px-6 py-4 bg-white/60 border-b border-black/5 text-zinc-700 font-semibold">
            <div></div>
            <div class="text-center">Item</div>
            <div> </div>
            <div class="text-center">Price</div>
            <div class="text-center">Quantity</div>
            <div class="text-center">Total</div>
            <div></div>
          </div>

          <div
            v-for="(row, idx) in rows"
            :key="row.productId"
            class="grid grid-cols-[70px_110px_1fr_140px_220px_140px_70px] items-center
                   px-6 py-5 border-b border-black/5 bg-white/40"
          >
            <div class="text-zinc-700">{{ idx + 1 }})</div>

            <div class="grid place-items-center">
              <img
                :src="row.product?.image"
                :alt="row.product?.title"
                class="h-16 w-16 object-contain"
              />
            </div>

            <div class="pr-4">
              <p class="font-semibold text-zinc-800 line-clamp-1">
                {{ row.product?.title ?? "Producto" }}
              </p>
            </div>

            <div class="text-center text-zinc-800 font-medium">
              ${{ (row.product?.price ?? 0).toFixed(2) }}
            </div>

            <div class="flex justify-center">
              <div class="inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <button
                  class="h-10 w-12 grid place-items-center text-xl text-zinc-700 hover:bg-zinc-50"
                  @click="cart.dec(row.productId)"
                  aria-label="Decrement"
                >
                  −
                </button>
                <div class="h-10 w-12 grid place-items-center font-semibold text-zinc-800">
                  {{ row.qty }}
                </div>
                <button
                  class="h-10 w-12 grid place-items-center text-xl text-zinc-700 hover:bg-zinc-50"
                  @click="cart.inc(row.productId)"
                  aria-label="Increment"
                >
                  +
                </button>
              </div>
            </div>

            <div class="text-center text-zinc-800 font-semibold">
              ${{ row.lineTotal.toFixed(2) }}
            </div>

            <div class="flex justify-center">
              <button
                class="h-10 w-10 rounded-xl bg-[#BD2C2D] hover:bg-[#A31D1D] text-white grid place-items-center"
                @click="cart.remove(row.productId)"
                title="Eliminar"
                aria-label="Remove"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile cards -->
        <div class="md:hidden p-4 space-y-3">
          <div
            v-for="(row, idx) in rows"
            :key="row.productId"
            class="bg-white/70 border border-black/5 rounded-2xl p-4"
          >
            <div class="flex gap-3">
              <div class="text-zinc-600 w-6">{{ idx + 1 }})</div>

              <img
                :src="row.product?.image"
                :alt="row.product?.title"
                class="h-16 w-16 object-contain bg-white rounded-xl border border-zinc-100 p-2"
              />

              <div class="flex-1">
                <p class="font-semibold text-zinc-800 line-clamp-2">
                  {{ row.product?.title ?? "Producto" }}
                </p>
                <p class="text-sm text-zinc-600 mt-1">
                  ${{ (row.product?.price ?? 0).toFixed(2) }}
                </p>
              </div>

              <button
                class="h-9 w-9 rounded-xl bg-[#BD2C2D] hover:bg-[#A31D1D] text-white grid place-items-center"
                @click="cart.remove(row.productId)"
                title="Eliminar"
              >
                🗑️
              </button>
            </div>

            <div class="mt-3 flex items-center justify-between">
              <div class="inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                <button class="h-10 w-12 grid place-items-center text-xl" @click="cart.dec(row.productId)">−</button>
                <div class="h-10 w-12 grid place-items-center font-semibold">{{ row.qty }}</div>
                <button class="h-10 w-12 grid place-items-center text-xl" @click="cart.inc(row.productId)">+</button>
              </div>

              <div class="text-right">
                <p class="text-sm text-zinc-600">Total</p>
                <p class="font-semibold text-zinc-900">${{ row.lineTotal.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Totals + CTA -->
        <div class="bg-white/60 p-6 flex flex-col items-end gap-2">
          <div class="text-zinc-700">
            Subtotal: <span class="font-semibold">${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="text-2xl font-extrabold text-zinc-900">
            Total to pay: ${{ subtotal.toFixed(2) }}
          </div>

          <button
            class="mt-4 h-12 px-10 rounded-xl bg-[#BD2C2D] hover:bg-[#A31D1D]
                   text-white font-semibold shadow-sm"
            @click="checkout"
          >
            Complete Purchase
          </button>
        </div>
      </div>
    </main>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import AppShell from "../components/layout/AppShell.vue";
import { useCartStore } from "../stores/cart";
import { useProductsStore } from "../stores/products"; // <-- asumo que existe en tu proyecto
import type { Product } from "../types/fakestore"; // ajusta si tu type está en otro path

const cart = useCartStore();
const products = useProductsStore();

// Carga productos (para tener title/image/price)
onMounted(async () => {
  // Si tu products store ya tiene lista, no vuelve a pedir (depende de tu implementación).
  // Si no tienes esto, dime y te lo adapto a fetch por IDs.
  await products.fetchList?.();
});

type Row = {
  productId: number;
  qty: number;
  product?: Product;
  lineTotal: number;
};

const productMap = computed(() => {
  return new Map(products.items.map((p) => [p.id, p]));
});


const rows = computed<Row[]>(() => {
  return cart.items.map((it) => {
    const p = productMap.value.get(it.productId);
    const price = p?.price ?? 0;
    return {
      productId: it.productId,
      qty: it.qty,
      product: p,
      lineTotal: price * it.qty,
    };
  });
});

const subtotal = computed(() => rows.value.reduce((acc, r) => acc + r.lineTotal, 0));

function checkout() {
  // aquí puedes hacer tu flujo real de checkout
  alert("Checkout pendiente 🙂");
}
</script>

<style scoped>
.line-clamp-1{
  display:-webkit-box;
  line-clamp:1;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
.line-clamp-2{
  display:-webkit-box;
  line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
}
</style>
