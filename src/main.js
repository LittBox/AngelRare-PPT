/**
 * Vue 应用入口
 * - 引入 Vue 3 + App 根组件
 * - 引入全局样式（reset → variables → main）
 */
import { createApp } from 'vue'
import App from './App.vue'

// 样式顺序很重要：reset 先重置，variables 定义主题变量，main 最后
import './styles/reset.css'
import './styles/variables.css'
import './styles/main.css'

const app = createApp(App)
app.mount('#app')
