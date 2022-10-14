import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import {auth } from "./includes/firebase";

let app;
//Load firebase first, so that we can check if user is authenticated when the app starts
auth.onAuthStateChanged(()=> {
    if(!app) {
        app = createApp(App)
        app.use(createPinia())
        app.use(router)
        app.use(VeeValidatePlugin)
        app.mount("#app")
    }
})


