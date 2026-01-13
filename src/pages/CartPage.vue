<template>
  <AppShell>
    <h1 class="text-2xl font-semibold text-zinc-800 mb-4">Cart</h1>

    <div v-if="cart.items.length === 0" class="bg-white/70 border border-white rounded-xl p-6">
      <p class="text-zinc-700">Your cart is empty.</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        <CartItemRow
          v-for="row in rows"
          :key="row.product.id"
          :product="row.product"
          :qty="row.qty"
          @inc="cart.inc(row.product.id)"
          @dec="cart.dec(row.product.id)"
          @remove="cart.remove(row.product.id)"
        />
      </div>

      <div class="bg-white/70 border border-white rounded-2xl p-5 h-fit">
        <p class="text-zinc-600">Items: <span class="font-semibold text-zinc-800">{{ cart.count }}</span></p>
        <p class="mt-2 text-zinc-600">
          Total:
          <span class="font-semibold text-zinc-800">${{ total.toFixed(2) }}</span>
        </p>

        <button
          class="mt-4 w-full h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium cursor-pointer"
          @click="checkout"
        >
          Finalizar Compra
        </button>

        <button class="mt-3 w-full h-11 rounded-full bg-white border border-zinc-200 text-zinc-800 cursor-pointer" @click="cart.clear()">
          Vaciar carrito
        </button>
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { postCart } from "../api/fakestore";
import CartItemRow from "../components/cart/CartItemRow.vue";
import AppShell from "../components/layout/AppShell.vue";
import { useCartStore } from "../stores/cart";
import { useProductsStore } from "../stores/products";

const cart = useCartStore();
const productsStore = useProductsStore();

// aseguramos tener productos para mapear info de carrito (precio/título/imagen)
onMounted(async () => {
  if (productsStore.items.length === 0) {
    await productsStore.fetchList();
  }
});

const rows = computed(() => {
  const map = new Map(productsStore.items.map((p) => [p.id, p]));
  return cart.items
    .map((it) => {
      const product = map.get(it.productId);
      return product ? { product, qty: it.qty } : null;
    })
    .filter(Boolean) as { product: any; qty: number }[];
});

const total = computed(() => cart.totalFromProducts(productsStore.items));

async function checkout() {
  // “bonus”: enviar carrito al endpoint /carts (no es necesario, pero está en requerimientos)
  try {
    await postCart({
      userId: 1,
      date: new Date().toISOString(),
      products: cart.items.map((i) => ({ productId: i.productId, quantity: i.qty })),
    });
  } catch {
    // si falla igual mostramos éxito local; la API es demo
  }

  alert("✅ Compra finalizada con éxito (demo).");
  cart.clear();
}
</script>
