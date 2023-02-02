import axios from "axios";

const url = 'https://fakestoreapi.com/products'

const api_config_prods = axios.create({
    baseURL: url,
})

export default api_config_prods