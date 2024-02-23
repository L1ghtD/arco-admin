import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import globalComponents from '@/components'
import router from './router'
import pinia from '@/store'
import App from './App.vue'

import directive from './directive'
import './mock'

// Styles are imported via arco-plugin. See config/plugin/arcoStyleImport.ts in the directory for details
// 样式通过 arco-plugin 插件导入。详见目录文件 config/plugin/arcoStyleImport.ts
// https://arco.design/docs/designlab/use-theme-package
import '@/assets/style/global.less'
import '@/api/interceptor'

import.meta.glob('./router/routes/modules/*.ts', { eager: true }) as any
// const modules = import.meta.glob('./router/routes/modules/*.ts', { eager: true }) as any
// console.log(modules)
// console.log(Object.keys(modules))
// Object.keys(modules).forEach((key) => {
//   const defaultModule = modules[key].default
//   const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
//   console.log(moduleList)
// })
// console.log(import.meta.env)

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)

app.use(pinia)
app.use(router)
app.use(globalComponents)
app.use(directive)

app.mount('#app')
