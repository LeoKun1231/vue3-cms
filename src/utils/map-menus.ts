import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'
let firstPath = ''
export function mapMenusToRoutes(userMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.加载所有route,拿到所有的Routes
  const allRoutes: RouteRecordRaw[] = []
  // 获取某一文件下所有的文件
  const routeFiles = require.context('../router/home', true, /\.ts/) //true开始深度遍历
  routeFiles.keys().forEach((key) => {
    // 进行拼接
    const route = require('../router/home' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.根据菜单获取需要添加的route
  // type === 1 -> children -> type == 1
  // type===2->url
  // 递归去获取路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => {
          // 由于我的主页路由是/home，所以需要拼接
          const path = '/main' + route.path.split('/home')[1]
          return path === menu.url
        })
        if (route) {
          // 保存菜单中的第一个地址，当路径是/main时重定向到第一个地址
          if (!firstPath) {
            firstPath = route.path
          }
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenu)
  return routes
}

// 面包屑，获取当前菜单以及父菜单
export function pathMapToMenu(userMenu: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  path = '/main' + currentPath.split('/home')[1]
  mapPathToMenu(userMenu, path, breadcrumbs)
  return breadcrumbs
}

// 解决菜单default问题
let path = ''
// 遍历根据路由获得菜单
export function mapPathToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrunb?: IBreadcrumb[]
): any {
  // 路径不一致
  if (!path) {
    path = '/main' + currentPath.split('/home')[1]
  }
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(menu.children ?? [], path)
      if (findMenu) {
        breadcrunb?.push({ name: menu.name })
        breadcrunb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}

// 遍历获得所有的权限
export function mapMenusToPermissions(userMenu: any[]) {
  const permissions: string[] = []
  const _recurseGetPerssions = (Menu: any[]) => {
    for (const item of Menu) {
      if (item.type === 1 || item.type === 2) {
        _recurseGetPerssions(item.children ?? [])
      } else if (item.type === 3) {
        permissions.push(item.permission)
      }
    }
  }
  _recurseGetPerssions(userMenu)
  return permissions
}

// 遍历获得叶子节点
export function mapLeaf(menu: any[]) {
  const leafList: number[] = []
  const _recurseMapLeaf = (menuList: any[]) => {
    for (const item of menuList) {
      if (item.children) {
        _recurseMapLeaf(item.children)
      } else {
        leafList.push(item.id)
      }
    }
  }
  _recurseMapLeaf(menu)
  return leafList
}

export { firstPath }
