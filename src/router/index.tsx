import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Error from '../pages/Error';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Test from '../pages/Test';
import AppLayout from '../pages/AppLayout';
import { lazy } from 'react';
import RouterBeforeEach from './RouterBeforeEach';
import Login from '../pages/login';

const modules: Record<string, () => Promise<any>> = import.meta.glob('../pages/**/*.tsx');
console.log('modules: ', modules);

const createLazyComponent = (path: string) => {
  const Component = lazy(modules[`../${path}.tsx`]);
  return <Component key={path} />;
};

const handleAsyncRoutes = (routes: RouteConfig[]): any =>
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

type RouteConfig = RouteObject & {
  name?: string;
  componentPath?: any;
  children?: RouteConfig[];
  meta?: {
    requireAuth: boolean;
  };
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
      { path: '', element: <span>/</span> },
      { path: 'about', element: <About />, meta: { requireAuth: true } },
      { path: 'test', element: <Test /> },
      {
        path: 'layout',
        // element: <Layout />,
        componentPath: 'pages/layout1/index',
        children: [
          { path: '1', componentPath: 'pages/layout1-1/index' },
          { path: '2', componentPath: 'pages/layout1-2/index' },
          {
            path: '3',
            componentPath: 'pages/layout1-3/index',
            children: [
              { path: '1', componentPath: 'pages/layout1-3-1/index' },
              { path: '2', componentPath: 'pages/layout1-3-2/index' }
            ]
          }
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
];
const asyncRoutes = handleAsyncRoutes(routes);

const router = createBrowserRouter(asyncRoutes);

export default router;
