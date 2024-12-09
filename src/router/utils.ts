import { createLazyComponent } from '.'
import type { RouteConfig } from './type'

/**
 * 遍历路由表，生成符合react-router的格式
 * @param routes
 * @returns
 */
export const normalizeRouteRecord = (routes: RouteConfig[]): any =>
    routes.map((route) => {
        if (route.children) {
            route.children = normalizeRouteRecord(route.children)
        }
        if (route.path && route.element) {
            return route
        }
        if (route.componentPath && !route.element) {
            return {
                ...route,
                path: route.path,
                element: createLazyComponent(route.componentPath)
            }
        } else return route
    })

type Menus = {
    key: string
    label: string
    path: string
    children?: Menus[]
}

export const generateMenus = (routes: RouteConfig[], basePath: string = ''): any[] => {
    return routes
        .filter((route) => route.path)
        .map((route: RouteConfig) => {
            const fullPath = `${basePath}/${route.path || ''}`.replace(/\/+/g, '/')
            const title = route.handle?.meta?.title || route.path?.replace(/\//, '')
            if (route.children) {
                return {
                    key: fullPath,
                    label: title,
                    children: generateMenus(route.children, fullPath)
                }
            }
            return {
                key: fullPath,
                label: title
            }
            return {
                key: parentPath ? `${parentPath}/${route.path}` : route.path,
                label: route?.handle?.meta?.title || route.path?.replace(/\//, ''),
                path: route.path
            }
        })
}
