import { createLazyComponent } from '.';
import { RouteConfig, RouteConfigWithFullPath } from './type';

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
        element: createLazyComponent(route.componentPath)
      };
    } else return route;
  });

/**
 * 给每级路由加上fullPath，用于在全局导航守卫中使用
 * @param routes
 * @param parentPath
 * @returns
 */
export const generateRoutesWithFullPath = (routes: RouteConfigWithFullPath[], parentPath = '') => {
  return routes.map((route) => {
    if (route.path === '*') {
      return route;
    }
    if (route.path?.startsWith('/')) {
      route.fullPath = route.path;
    } else {
      route.fullPath = `${parentPath}/${route.path}`.replace(/\/+/, '/');
    }
    if (route.children && route.children.length > 0) {
      route.children = generateRoutesWithFullPath(route.children, route.fullPath);
    }
    return route;
  });
};
