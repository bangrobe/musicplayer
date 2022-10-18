import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import {auth } from "./includes/firebase";
import i18n from './includes/i18n'
import { registerSW } from 'virtual:pwa-register'
import progressBar from './includes/progress-bar'
// import { GlobalComponents } from './includes/_globals';
//Directives
import Icon from './directives/icon'
import 'nprogress/nprogress.css'
//register service worker
registerSW({
    immediate: true
});

progressBar(router);
let app;
//Load firebase first, so that we can check if user is authenticated when the app starts
auth.onAuthStateChanged(()=> {
    if(!app) {
        app = createApp(App)
        app.use(createPinia())
        app.use(router)
        app.use(VeeValidatePlugin)
        app.use(i18n)
        // app.use(GlobalComponents)
        app.directive("icon", Icon) //v-icon, 
        app.mount("#app")
    }
})


