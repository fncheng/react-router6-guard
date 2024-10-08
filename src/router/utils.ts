import { createLazyComponent } from ".";
import { RouteConfig } from "./type";

/**
 * 遍历路由表，生成符合react-router的格式
 * @param routes
 * @returns
 */
export const normalizeRouteRecord = (routes: RouteConfig[]): any =>
    routes.map((route) => {
        if (route.children) {
            route.children = normalizeRouteRecord(route.children);
        }
        if (route.path && route.element) {
            return route;
        }
        if (route.componentPath && !route.element) {
            return {
                ...route,
                path: route.path,
                element: createLazyComponent(route.componentPath),
            };
        } else return route;
    });
