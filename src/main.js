import axios from "axios"
axios.defaults.baseURL = 'http://localhost:3005'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('ru')
dayjs.extend(relativeTime)

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js"

createApp(App).use(router).mount('#app')
