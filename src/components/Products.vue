<template>
    <h1 class="text-2xl font-semibold text-slate-600 mb-3">Nuevo Producto</h1>

    <form @submit.prevent="addProduct" method="POST">
        <div class="flex flex-col space-y-2 mb-2">
            <input v-model="prod.title" type="text" placeholder="Nombre..." class="rounded-md">
            <input v-model="prod.price" type="number" placeholder="Precio..." class="rounded-md">
            <input v-model="prod.description" type="text" placeholder="Descripcion..." class="rounded-md">
            <input v-model="prod.image" type="text" placeholder="Imagen..." class="rounded-md">
            <input v-model="prod.category" type="text" placeholder="Categoria..." class="rounded-md">
        </div>

        <button class="btn btn-success" type="submit">Agregar</button>
    </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useProductStore } from "../stores/product";

const productStore = useProductStore()
const prod = ref({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
})

// en verdad no se agrega al backend pero esta es la logica
const addProduct = async () => {
    // const params = {
    //     title: prod.value.title,
    //     price: prod.value.price,
    //     description: prod.value.description,
    //     image: prod.value.image,
    //     category: prod.value.category,
    // }

    const params = { ...prod.value }

    try {
        const res = await axios.post('https://fakestoreapi.com/products', params)
        const newProd = res.data
        productStore.products.push(newProd)
        clearForm()
        console.log(newProd);
    } catch (e) {
        console.log(e);
    }
}

const clearForm = () => {
    prod.value.title = ''
    prod.value.price = 0
    prod.value.description = ''
    prod.value.image = ''
    prod.value.category = ''
}

</script>

<style>

</style>
