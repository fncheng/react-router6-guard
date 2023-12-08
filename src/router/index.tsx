import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import Error from '../pages/Error';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Test from '../pages/Test';
import AppLayout from '../pages/AppLayout';
import { lazy } from 'react';
import RouterBeforeEach from './RouterBeforeEach';
import Login from '../pages/login';
import { RouteConfig, RouteConfigWithFullPath } from './type';
import { generateRoutesWithFullPath, normalizeRouteRecord } from './utils';

const modules: Record<string, () => Promise<any>> = import.meta.glob('../pages/**/*.tsx');

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
    ),
    meta: {
      name: '登录页'
    }
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
      { path: '', redirect: 'about' },
      { path: 'about', element: <About />, meta: { requireAuth: true } },
      { path: 'test', element: <Test /> },
      {
        path: 'layout',
        // element: <Layout />,
        componentPath: 'pages/layout1/index',
        redirect: '1',
        children: [
          {
            path: '1',
            componentPath: 'pages/layout1-1/index',
            meta: { requireAuth: true }
          },
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
  {
    path: '/about',
    element: 'about'
  },
  {
    path: '/settings',
    element: (
      <RouterBeforeEach>
        <div>
          settings <Outlet />
        </div>
      </RouterBeforeEach>
    ),
    children: [
      {
        index: true,
        element: <Navigate to='profile' />
      },
      {
        path: 'profile',
        element: (
          <div>
            profile <Outlet />
          </div>
        ),
        children: [
          { index: true, element: <Navigate to='a' /> },
          { path: 'a', element: <div>aaa</div> },
          { path: 'a', element: <div>aaa</div> }
        ]
      }
    ]
  },
  { path: '*', element: <NotFound /> }
];

const routesWithFullPath = generateRoutesWithFullPath(routes);
console.log('routesWithFullPath: ', routesWithFullPath);

let rotuesMap = new Map<
  string,
  Pick<RouteConfigWithFullPath, 'meta' | 'fullPath' | 'path' | 'redirect'>
>();
const handleRoutesToMap = (routes: RouteConfigWithFullPath[]) => {
  routes.forEach((route) => {
    if (route.fullPath) {
      if (route.children) {
        handleRoutesToMap(route.children);
      }
      rotuesMap.set(route.fullPath, route);
    }
    return;
  });
  return rotuesMap;
};

handleRoutesToMap(routesWithFullPath);
console.log('rotuesMap: ', rotuesMap);

const asyncRoutes = normalizeRouteRecord(routesWithFullPath);

const router = createBrowserRouter(asyncRoutes);

export default router;

export { rotuesMap };
