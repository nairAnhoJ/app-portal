import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import { createPinia } from 'pinia'
import axios from './axios'

const pinia = createPinia();

createApp(App)
.use(pinia)
.use(router)
.mount('#app')