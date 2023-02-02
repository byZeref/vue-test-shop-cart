import api_config_prods from "../api/api_config_products"
import api_config_categ from "../api/api_config_categories"

const api_request = async (products_store, error, categories) => {
    try {
        const res = await api_config_prods.get()
        const { data } = res
        data.forEach(item => {
            const prod = {
                id: item.id,
                name: item.title,
                price: item.price,
                image: item.image,
                category: fixCateg(item.category),
                desc: item.description
            }
            products_store.push(prod)
        });

        const res2 = await api_config_categ.get()
        res2.data.forEach(item => {
            categories.value.push(fixCateg(item))
        });

    } catch (e) {
        error.value = true
    }

}
// primera letra mayuscula
const fixCateg = (categ = '') => {
    const arr = categ.split(' ')
    arr.forEach((word, index) => {
        arr.splice(index, 1)
        arr.unshift(word.substring(0, 1).toUpperCase() + word.substring(1))
    });
    return arr.reverse().join(' ')
}

export default api_request