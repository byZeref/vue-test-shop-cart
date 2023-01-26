<template>
    <div v-for="(item) in productStore.filter_products" :key="item.id"
        class="card md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white">
        <img class="h-48 w-full rounded-t-xl object-cover 2xl:h-40" :src="item.image" :alt="`Imagen de ${item.name}`">
        <div class="content p-8 flex flex-col justify-between">
            <div class="mb-2 md:mb-1 ">
                <h3 class="text-lg font-semibold uppercase text-sky-500">{{ item.name }}</h3>
                <p class=" text-slate-500 mb-1">Precio: ${{ item.price }}</p>
            </div>
            <button @click="addToCart(item)" class="btn btn-info btn-block">
                Agregar al Carrito
            </button>
        </div>
    </div>

</template>

<script setup>
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';

const productStore = useProductStore()
const cartStore = useCartStore()

const addToCart = (item) => {
    cartStore.add(item)
}

</script>

<style scoped>
.card .content {
    flex: 1 1 auto;
}
</style>
