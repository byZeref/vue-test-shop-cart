import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const filter_products = ref(products.value)
    const empty_search = ref(false)

    // TODO eliminar filtro al utilizar dropdown y viceversa (filter_input en store)
    const filterProds = (value) => {

        (value) ? filter_products.value = products.value.filter(item => item.name.toLowerCase().includes(value))
            : (filter_products.value = products.value)

        filter_products.value.length === 0 ? empty_search.value = true : empty_search.value = false
    }

    const filterProdsByCateg = (arr = []) => {
        // arr.length !== 0 && (document.getElementById('search_input').value = '')
        filter_products.value = products.value.filter(item => {
            return arr.some(value => value === item.category) && item
        })
        filter_products.value.length === 0 && (filter_products.value = products.value)
    }

    const sortProds = (value) => {
        if (value === 'nombre') {
            filter_products.value.sort((a, b) => {
                if (a.name > b.name) return 1
                if (a.name < b.name) return -1
                return 0
            })
        }
        if (value === 'precio') {
            filter_products.value.sort((a, b) => {
                if (a.price > b.price) return 1
                if (a.price < b.price) return -1
                return 0
            })
        }
    }

    return { products, filter_products, filterProds, empty_search, sortProds, filterProdsByCateg }
})