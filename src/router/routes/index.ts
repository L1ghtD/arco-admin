import type { RouteRecordNormalized } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

// 作用：将 ./modules/*.ts 的文件导出的 default(AppRouteRecordRaw) 依次添加到 list，并返回
function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])
