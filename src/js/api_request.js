import api_config from "../api/api_config"

const api_request = async (products_store) => {
    try {
        const res = await api_config.get()
        const { data } = res
        data.forEach(item => {
            const prod = {
                id: item.id,
                name: item.title,
                price: item.price,
                image: item.image
            }
            products_store.push(prod)
        });
    } catch (e) {
        console.log('Error');
        console.log(e);
    }

}

export default api_request