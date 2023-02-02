import axios from "axios";

const url = 'https://fakestoreapi.com/products/categories'

const api_config_categ = axios.create({
    baseURL: url,
})

export default api_config_categ