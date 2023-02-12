import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const filter_products = ref([])
    const empty_search = ref(false)

    let filteringCateg = false

    const filterProds = (value) => {

        if (filteringCateg) {
            // FIXME no funciona
            const arr = filter_products.value.map(item => item);
            console.log(arr);
            (value) ? filter_products.value = arr.filter(item => item.name.toLowerCase().includes(value))
                : (filter_products.value = arr)
        } else {
            (value) ? filter_products.value = products.value.filter(item => item.name.toLowerCase().includes(value))
                : (filter_products.value = products.value)
        }


        filter_products.value.length === 0 ? empty_search.value = true : empty_search.value = false
    }

    const filterProdsByCateg = (arr = []) => {
        filter_products.value = products.value.filter(item => {
            return arr.some(value => value === item.category) && item
        })
        if (filter_products.value.length === 0) {
            if (arr.length === 0) {
                filter_products.value = products.value
                empty_search.value = false
            } else {
                empty_search.value = true
            }
        }

        if (filter_products.value.length !== products.value.length) filteringCateg = true
        else filteringCateg = false
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
        if (value === 'rating') {
            filter_products.value.sort((a, b) => {
                if (a.rating > b.rating) return -1
                if (a.rating < b.rating) return 1
                return 0
            })
        }
    }

    return { products, filter_products, filterProds, empty_search, sortProds, filterProdsByCateg }
})