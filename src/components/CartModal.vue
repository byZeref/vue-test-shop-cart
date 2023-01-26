<template>
    <input type="checkbox" id="cart-modal" class="modal-toggle" />
    <div class="modal max-md:modal-bottom">
        <div v-if="!cartStore.empty" class="modal-box w-full md:max-w-3xl">
            <!-- HEADER -->
            <div class="flex items-center justify-between border-b border-slate-300 pb-4 px-1 md:px-2">
                <h3 class="font-semibold text-slate-600 md:text-lg uppercase ">
                    Carrito de Compras
                </h3>
                <button @click="clearCart" class="btn btn-outline btn-error btn-sm text-xs">
                    Vaciar Carrito
                </button>
            </div>
            <!-- MAIN DATA -->
            <div class="w-full">
                <div v-for="(item) in cartStore.cart" :key="item.id"
                    class="flex items-center border-b border-slate-300">
                    <!-- PRODUCTS -->
                    <div class="basis-1/3 md:basis-1/4 px-1 md:px-2 py-4">
                        <p class="text-slate-700 text-base md:text-lg font-bold">
                            {{ item.product }}
                        </p>
                        <p class="text-slate-500 max-md:text-sm">
                            Cantidad: {{ item.cant }}
                        </p>
                    </div>
                    <!-- ACTION BUTTONS -->
                    <div class="basis-1/3 md:basis-2/4 flex justify-center md px-0 md:px-2 py-4 items-center">
                        <button @click="addToCart(item)" class="btn btn-success btn-xs md:btn-sm btn-square">
                            <PlusIcon class="w-3 h-3 md:w-5 md:h-5" />
                        </button>
                        <button @click="removeFromCart(item)" class="btn btn-error btn-xs md:btn-sm btn-square mx-1">
                            <MinusIcon class="w-3 h-3 md:w-5 md:h-5" />
                        </button>
                        <button @click="removeFullProd(item)" class="btn btn-ghost btn-sm text-xs">
                            <span class="md:hidden">Eliminar</span>
                            <span class="max-md:hidden">Eliminar Producto</span>
                        </button>
                    </div>
                    <!-- MOUNTS -->
                    <div class="basis-1/3 md:basis-1/4 px-1 md:px-2 py-4 text-end">
                        <p class="font-semibold">${{ item.monto.toFixed(2) }}</p>
                    </div>
                </div>
            </div>
            <!-- SUBTOTAL -->
            <div class="flex justify-end items-center px-1 md:px-2 pt-2 font-semibold">
                <div class="flex items-center">
                    <p>Subtotal ({{ cartStore.counter }} productos):</p>
                    <p class="text-lg ml-1">${{ cartStore.mount.toFixed(2) }}</p>
                </div>
            </div>
            <!-- ACTION MODAL BUTTONS -->
            <div class="modal-action">
                <button @click.prevent="buy" :class="[loadingBuy ? 'loading' : '', 'btn btn-accent']">
                    Proceder a la Compra
                </button>
                <label for="cart-modal" class="btn">Aceptar</label>
            </div>
        </div>
        <!-- EMPTY CART -->
        <div v-else class="modal-box w-full md:max-w-3xl">
            <div :class="`text-${modalInfoCss}`">
                <p class="flex items-center font-semibold text-sm md:text-lg">
                    <InformationCircleIcon v-if="buyMsgeCode !== 1" class="w-7 h-7 mr-1" />
                    <CheckCircleIcon v-if="buyMsgeCode === 1" class="w-7 h-7 mr-1" />
                    <span>{{ cartStore.cleaningMsge }}</span>
                </p>
            </div>
            <div class="modal-action">
                <label for="cart-modal" :class="`btn btn-${modalInfoCss}`">Aceptar</label>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, MinusIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { useProductStore } from '../stores/product'
import { useCartStore } from '../stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const loadingBuy = ref(false)
const modalInfoCss = ref('')
const buyMsgeCode = computed(() => {
    if (cartStore.cleaningCode === 1) {
        modalInfoCss.value = 'accent'
    } else {
        modalInfoCss.value = 'slate-600'
    }
    return cartStore.cleaningCode
})

const buy = () => {
    // validaciones y rebajar del stock
    loadingBuy.value = true
    setTimeout(() => {
        cartStore.clear(1)
        loadingBuy.value = false
    }, 1500);
}

const addToCart = (item) => {
    const prod = productStore.products.find(el => el.id === item.id)
    cartStore.add(prod)
}

const removeFromCart = (item) => {
    cartStore.remove(item)
    checkEmptyCart()
}

const removeFullProd = (item) => {
    cartStore.removeFullProduct(item)
    checkEmptyCart()
}

const checkEmptyCart = () => {
    if (cartStore.empty) cartStore.cleaningCode = 0
}

const clearCart = () => {
    cartStore.clear(0)
}

</script>

<style scoped>

</style>
