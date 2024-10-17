import { Navigate, Outlet, RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import { lazy } from "react";
import Login from "../pages/login";
import { userLoader } from "../pages/About/userLoader.ts";
import App from "../App.tsx";
import Layout1 from "@/pages/layout1/index.tsx";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const modules: Record<string, () => Promise<any>> = import.meta.glob("../pages/**/*.tsx");

export const createLazyComponent = (path: string) => {
    const Component = lazy(modules[`../pages/${path}.tsx`]);
    return <Component key={path} />;
};

const About = lazy(() => import("../pages/About/index.tsx"));
const About1 = lazy(() => import("../pages/About/About1.tsx"));
const Home = lazy(() => import("../pages/Home/index"));

/**
 * Loadable Components Full dynamic import
 */
const AsyncPage = loadable(
    (props: { page: string }) => pMinDelay(import(`../pages/${props.page}/index.tsx`), 300),
    {
        fallback: <div> Layout Loading...</div>,
        cacheKey: (props) => props.page,
    }
);

export const routes: RouteObject[] = [
    {
        path: "/login",
        element: (
            <Login />
        ),
        handle: {
            meta: {
                title: "登录页",
            },
        },
    },
    {
        path: "/",
        errorElement: <Error />,
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
                handle: {
                    meta: {
                        title: "Home页",
                    },
                },
            },
            {
                path: "about1",
                element: <About1 />,
                errorElement: <Error />,
            },
            {
                id: "user",
                path: "about",
                element: <About />,
                loader: userLoader,
            },
            {
                path: "test",
                element: <Test />,
                handle: {
                    meta: { requireAuth: true, title: "Test" },
                },
            },
            {
                path: "layout",
                element: <Layout1 />,
                children: [
                    {
                        path: "1",
                        element: <AsyncPage page="layout1-1" />,
                    },
                    {
                        path: "2",
                        element: <AsyncPage page="layout1-2" />,
                    },
                    {
                        path: "3",
                        element: <AsyncPage page="layout1-3" />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="1" />,
                            },
                            {
                                path: "1",
                                element: <AsyncPage page="layout1-3-1" />,
                            },
                            {
                                path: "2",
                                element: <AsyncPage page="layout1-3-2" />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "/settings",
        element: (
            <div>
                settings <Outlet />
            </div>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="profile" />,
            },
            {
                path: "profile",
                element: (
                    <div>
                        profile <Outlet />
                    </div>
                ),
                children: [
                    { index: true, element: <Navigate to="a" /> },
                    { path: "a", element: <div>aaa</div> },
                    { path: "a", element: <div>aaa</div> },
                ],
            },
        ],
    },
    { path: "/unpermission", element: <div>unpermission</div> },
    { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

const Router = () => <RouterProvider router={router} />;

export default Router;
