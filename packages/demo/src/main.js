import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css'
import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'
import globalComponents from './components/index'


const app = createApp(App)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(uploader)
app.use(globalComponents)
app.mount('#app')
