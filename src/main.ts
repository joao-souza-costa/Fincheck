import './index.css'
import 'vue-toastification/dist/index.css'

import Toast from 'vue-toastification'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from "@tanstack/vue-query";

//use it 


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,

      }
    },
  },
})
app.use(Toast)

app.mount('#app')
