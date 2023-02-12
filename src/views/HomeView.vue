<template>
  <div v-if="!loading && !error" id="container" class="flex flex-col mt-3 mb-2 md:mb-20">
    <!-- HEADER -->
    <div class="flex flex-col md:flex-row justify-between mb-6 ml-2">
      <div class="flex items-center">
        <h1 class="text-3xl text-slate-600 font-semibold mb-1">Productos</h1>
        <!-- <button @click="$router.push('/products')" class="btn-success btn btn-sm ml-2">Nuevo</button> -->
      </div>
      <div class="flex flex-col md:flex-row md:space-x-2">
        <SearchFilter />
        <DropdownSort />
        <DropdownCategories :categories="categories" />
      </div>
    </div>
    <!-- PRODUCTS CARDS -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Shop />
    </div>
    <!-- EMPTY SEARCH -->
    <div v-if="productStore.empty_search">
      <div class="flex flex-col md:flex-row items-center space-x-1 bg-slate-300 rounded-md py-4 px-5 md:py-10 md:px-12">
        <ExclamationTriangleIcon class="h-8 w-8 text-slate-600" />
        <div class="flex items-center">
          <h3 class="md:text-xl text-slate-600">
            <span class="text-slate-600 font-semibold">Upss!!</span>
            No se encontraron resultados en la búsqueda.
          </h3>
        </div>
      </div>
    </div>

    <!-- LOADING SCROLL -->
    <div id="loading-scroll" v-if="scrollData" class="flex justify-center mt-8">
      <div id="loading"></div>
    </div>
  </div>
  <!-- LOADING ANIMATION -->
  <div id="loading-container" v-if="loading" class="flex justify-center items-center min-h-[80vh]">
    <div id="loading"></div>
  </div>
  <!-- API ERROR -->
  <div v-if="error" class="mt-10">
    <div class="flex flex-col md:flex-row items-center space-x-1 bg-red-200 rounded-md py-4 px-5 md:py-10 md:px-12">
      <ExclamationTriangleIcon class="h-8 w-8 text-red-500" />
      <div class="flex items-center">
        <h3 class="md:text-xl text-red-500">
          <span class="text-red-500 font-semibold">Ocurrió un error!!</span>
          Por favor revise su conexión a internet.
        </h3>
      </div>
    </div>
  </div>

</template>

<script setup>
import '../assets/css/loading.css'
import api_request from "../js/api_request";
import { ref, onMounted, onUnmounted, onBeforeMount } from "vue";
import { useProductStore } from "../stores/product";
import Shop from "../components/Shop.vue";
import SearchFilter from "../components/SearchFilter.vue";
import DropdownSort from '../components/DropdownSort.vue';
import DropdownCategories from '../components/DropdownCategories.vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const productStore = useProductStore()
const loading = ref(false)
const error = ref(false)
const categories = ref([])
const scrollData = ref(false)

onMounted(async () => {
  // window.addEventListener('scroll', scrolling)
  await api_request(productStore.products, error, categories)
  productStore.filter_products = productStore.products
})


// INFINITE LOADING NO FUNCIONA BIEN

// onBeforeMount(() => {
//   loadData()
// })
// onUnmounted(() => {
//   window.removeEventListener('scroll', scrolling)
// })
// const scrolling = () => {
//   scrollData.value = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
//   if (scrollData.value) {
//     loadData()
//   }
// }
// const loadData = async () => {
//   productStore.products.length === 0 && (loading.value = true)
//   await api_request(productStore.products, error, categories)
//   productStore.filter_products = productStore.products
//   scrollData.value = false
//   loading.value === true && (loading.value = false)
// }

</script>

<style scoped>

</style>
