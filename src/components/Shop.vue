<template>
    <div v-for="(item) in productStore.filter_products" :key="item.id"
        class="card md:mx-2 rounded-xl lg:max-w-3xl shadow-lg bg-white">
        <img class="h-48 w-full rounded-t-xl object-cover 2xl:h-40" :src="item.image" :alt="`Imagen de ${item.name}`">
        <div class="content p-8 flex flex-col justify-between">
            <div class="mb-2">
                <div class="tooltip w-full" :data-tip="item.name">
                    <h3 class="text-start text-lg font-semibold uppercase text-sky-500 truncate">
                        <label @click="showDescript(item)" class="hover:cursor-pointer" for="description-modal">
                            {{ item.name }}
                        </label>
                    </h3>
                </div>
                <div class="mb-2">
                    <span class="bg-slate-200 text-slate-600 text-sm rounded-md px-2 py-1">{{ item.category }}</span>
                </div>
                <p class=" text-slate-500 mb-1">Precio: ${{ item.price.toFixed(2) }}</p>
            </div>
            <button @click="addToCart(item)" class="btn btn-info btn-block">
                Agregar al Carrito
            </button>
        </div>
    </div>

    <!-- DESCRIPTION MODAL -->
    <input type="checkbox" id="description-modal" class="modal-toggle" />
    <div class="modal max-md:modal-bottom">
        <div class="modal-box w-full md:max-w-2xl lg:max-w-3xl">
            <h3 class="text-slate-700 text-lg md:text-2xl mb-2">{{ prodDescript.name }}</h3>
            <p class="text-slate-500 md:text-lg">{{ prodDescript.desc }}</p>
            <div class="modal-action">
                <label for="description-modal" class="btn btn-sm text-xs md:btn-md">Aceptar</label>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';

const productStore = useProductStore()
const cartStore = useCartStore()
const prodDescript = ref({})

const addToCart = (item) => {
    cartStore.add(item)
}

const showDescript = (prod) => {
    prodDescript.value = prod
}

onMounted(() => {
    productStore.sortProds('nombre')
})

</script>

<style scoped>
.card .content {
    flex: 1 1 auto;
}
</style>
