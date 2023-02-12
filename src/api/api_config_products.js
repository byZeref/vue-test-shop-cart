import axios from "axios";

const url = 'https://fakestoreapi.com/products'

const api_config_prods = axios.create({
    baseURL: url,
    params: {
        limit: 10,
    }
})

export default api_config_prods