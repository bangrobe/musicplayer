import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import VeeValidatePlugin from './includes/validation'
const app = createApp(App)
app.use(createPinia())
app.use(VeeValidatePlugin)
app.mount("#app")
