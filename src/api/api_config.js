import axios from "axios";

const url = 'https://fakestoreapi.com/products'

const api_config = axios.create({
    baseURL: url,
})

export default api_config