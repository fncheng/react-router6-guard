import { createLazyComponent } from '.';
import { RouteConfig } from './type';

/**
 * 遍历路由表，生成符合react-router的格式
 * @param routes
 * @returns
 */
export const handleAsyncRoutes = (routes: RouteConfig[]): any =>
  routes.map((route) => {
    if (route.children) {
      route.children = handleAsyncRoutes(route.children);
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
export const generateRoutesWithFullPath = (routes: RouteConfig[], parentPath = '') => {
  return routes.map((route) => {
    let fullPath;
    if (parentPath === '/') {
      fullPath = `/${route.path}`;
    } else {
      if (route.path?.startsWith('/') && parentPath !== '/') {
        fullPath = route.path;
      } else {
        fullPath = `${parentPath}/${route.path}`;
      }
    }

    if (route.children && route.children.length > 0) {
      route.children = generateRoutesWithFullPath(route.children, fullPath);
    }
    return {
      ...route,
      fullPath
    };
  });
};
