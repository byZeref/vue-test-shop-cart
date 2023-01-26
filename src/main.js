import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router'
// import VueSweetalert2 from 'vue-sweetalert2'; // Sweet Alert

import './assets/css/main.css'
import './assets/css/styles.css' // Tailwind
// import 'sweetalert2/dist/sweetalert2.min.css'; // Sweet Alert

const app = createApp(App)
const pinia = createPinia()

// Sweet Alert
// const options = {
//     confirmButtonColor: '#41b882',
//     cancelButtonColor: 'gray',
// };
// app.use(VueSweetalert2, options)

// Router
app.use(router)

// Pinia
app.use(pinia)

app.mount('#app')
