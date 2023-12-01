import { createBrowserRouter } from 'react-router-dom';
import Error from '../pages/Error';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Test from '../pages/Test';
import AppLayout from '../pages/AppLayout';
import { lazy } from 'react';
import RouterBeforeEach from './RouterBeforeEach';
import Login from '../pages/login';
import { RouteConfig, RouteConfigWithFullPath } from './type';
import { generateRoutesWithFullPath, handleAsyncRoutes } from './utils';

const modules: Record<string, () => Promise<any>> = import.meta.glob('../pages/**/*.tsx');

console.log('modules: ', modules);

export const createLazyComponent = (path: string) => {
  const Component = lazy(modules[`../${path}.tsx`]);
  return <Component key={path} />;
};

export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: (
      <RouterBeforeEach>
        <Login />
      </RouterBeforeEach>
    )
  },
  {
    path: '/',
    errorElement: <Error />,
    element: (
      <RouterBeforeEach>
        <AppLayout />
      </RouterBeforeEach>
    ),
    children: [
      { path: '', element: <span>/</span>, meta: { requireAuth: true } },
      { path: 'about', element: <About />, meta: { requireAuth: true } },
      { path: 'test', element: <Test /> },
      {
        path: 'layout',
        // element: <Layout />,
        componentPath: 'pages/layout1/index',
        children: [
          { path: '1', componentPath: 'pages/layout1-1/index', meta: { requireAuth: true } },
          { path: '2', componentPath: 'pages/layout1-2/index', meta: { requireAuth: true } },
          {
            path: '3',
            componentPath: 'pages/layout1-3/index',
            children: [
              { path: '1', componentPath: 'pages/layout1-3-1/index', meta: { requireAuth: true } },
              { path: '2', componentPath: 'pages/layout1-3-2/index', meta: { requireAuth: true } }
            ]
          }
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
];

const routesWithFullPath = generateRoutesWithFullPath(routes);
console.log('routesWithFullPath: ', routesWithFullPath);

let rotuesMap = new Map<string, Pick<RouteConfigWithFullPath, 'meta' | 'fullPath' | 'path'>>();
const handleRoutesToMap = (routes: RouteConfigWithFullPath[]) => {
  routes.forEach((route) => {
    if (route.fullPath) {
      if (route.children) {
        handleRoutesToMap(route.children);
      }
      rotuesMap.set(route.fullPath, {
        path: route.path,
        fullPath: route.fullPath,
        meta: route.meta
      });
    }
    return;
  });
  return rotuesMap;
};

handleRoutesToMap(routesWithFullPath);

const asyncRoutes = handleAsyncRoutes(routes);

const router = createBrowserRouter(asyncRoutes);

export default router;

export { rotuesMap };
