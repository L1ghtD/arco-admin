import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    roles?: string[] // Controls roles that have access to the page
    requiresAuth: boolean // Whether login is required to access the current page (every route must declare)
    icon?: string // The icon show in the side menu
    hideInMenu?: boolean // If true, it is not displayed in the side menu
    title?: string // 替代原本的 locale
    hideChildrenInMenu?: boolean // if set true, the children are not displayed in the side menu
    activeMenu?: string // if set name, the menu will be highlighted according to the name you set
    order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is
    noAffix?: boolean // if set true, the tag will not affix in the tab-bar
    ignoreCache?: boolean // if set true, the page will not be cached
  }
}
