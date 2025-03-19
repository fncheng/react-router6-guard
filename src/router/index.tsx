import { Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from '../pages/Error'
import NotFound from '../pages/NotFound'
import { lazy } from 'react'
import Login from '../pages/login'
import { userLoader } from '../pages/About/userLoader.ts'
import App from '../App.tsx'
import Layout1 from '@/pages/layout1/index.tsx'
import loadable from '@loadable/component'

const modules: Record<string, () => Promise<any>> = import.meta.glob('../pages/**/*.tsx')

export const createLazyComponent = (path: string) => {
    const Component = lazy(modules[`../pages/${path}.tsx`])
    return <Component key={path} />
}

const About = lazy(() => import('../pages/About/index.tsx'))
const About1 = lazy(() => import('../pages/About/About1.tsx'))
const Home = lazy(() => import('../pages/Home/index'))
/**
 * Loadable Components Full dynamic import
 */
// const AsyncPage = loadable(
//     (props: { page: string }) => pMinDelay(import(`../pages/${props.page}/index.tsx`), 3000),
//     {
//         fallback: <div> Layout Loading...</div>,
//         cacheKey: (props) => props.page,
//     }
// );

export const loadWithDelay = (promise: Promise<any>, time: number) => {
    const delay = (d: number) => new Promise((resolve) => setTimeout(resolve, d))
    const delayPromise = delay(time)
    return Promise.all([promise, delayPromise]).then(() => promise)
}

const Test = lazy(() => loadWithDelay(import('../pages/Test/index.tsx'), 500))

const AsyncPage = loadable(
    (props: { page: string }) => loadWithDelay(import(`../pages/${props.page}/index.tsx`), 100),
    {
        fallback: <div>Please wait...</div>,
        cacheKey: (props) => props.page
    }
)

const AntdPage = loadable(
    (props: { page: string }) => {
        const pagePath = `../pages/${props.page}.tsx`
        const pageModule = modules[pagePath]
        return loadWithDelay(pageModule(), 200)
    },
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page
    }
)

export const routes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
        handle: {
            meta: {
                title: '登录页'
            }
        }
    },
    {
        path: '/',
        errorElement: <Error />,
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to='/home' />
            },
            {
                path: 'home',
                element: <Home />,
                handle: {
                    meta: {
                        title: 'Home页'
                    }
                }
            },
            {
                path: 'about1',
                element: <About1 />,
                errorElement: <Error />
            },
            {
                id: 'user',
                path: 'about',
                element: <About />,
                loader: userLoader,
                // ErrorBoundary: Error,
                errorElement: <Error />
            },
            {
                path: 'test',
                element: <Test />
            },
            {
                path: 'noauth',
                element: <Test />,
                handle: {
                    meta: { requireAuth: true, title: 'Test' }
                }
            },
            {
                path: 'mobx',
                element: <AsyncPage page='mobx' />
            },
            {
                path: 'axios',
                element: <AsyncPage page='Axios' />
            },
            {
                path: 'radix',
                element: <AsyncPage page='Radix' />
            },
            {
                path: 'pdf',
                element: <AsyncPage page='pdf' />
            },
            {
                path: 'zustand',
                element: <AsyncPage page='zustand' />
            },
            {
                path: 'layout',
                element: <Layout1 />,
                children: [
                    {
                        index: true,
                        element: <Navigate to='1' />
                    },
                    {
                        path: '1',
                        element: <AsyncPage page='layout1-1' />
                    },
                    {
                        path: '2',
                        element: <AsyncPage page='layout1-2' />
                    },
                    {
                        path: '3',
                        element: <AsyncPage page='layout1-3' />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to='1' />
                            },
                            {
                                path: '1',
                                element: <AsyncPage page='layout1-3-1' />,
                                handle: {
                                    meta: { title: 'Layout 1-3-1' }
                                }
                            },
                            {
                                path: '2',
                                element: <AsyncPage page='layout1-3-2' />,
                                handle: {
                                    meta: { title: 'Layout 1-3-2' }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/settings',
        element: (
            <div>
                <Outlet />
            </div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='profile' />
            },
            {
                path: 'profile',
                element: <AsyncPage page='settings' />,
                children: [
                    { index: true, element: <Navigate to='a' /> },
                    { path: 'a', element: <AntdPage page='settings/a' /> },
                    { path: 'b', element: <AntdPage page='settings/b' /> },
                    { path: 'c', element: <AntdPage page='settings/c' /> }
                ]
            }
        ]
    },
    { path: '/unpermission', element: <div>unpermission</div> },
    { path: '*', element: <NotFound /> }
]

const router = createBrowserRouter(routes, { basename: '/app' })

const Router = () => <RouterProvider router={router} />

export default Router
