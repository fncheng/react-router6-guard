import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import { lazy } from "react";
import RouterBeforeEach from "./RouterBeforeEach";
import Login from "../pages/login";
import { type RouteConfig } from "./type";
import { normalizeRouteRecord } from "./utils";
import { userLoader } from "../pages/About/userLoader.ts";
import App from "../App.tsx";
import Layout1 from "@/pages/layout1/index.tsx";
import Layout11 from "@/pages/layout1-1/index.tsx";
import Layout2 from "@/pages/layout1-2/index.tsx";
import Layout3 from "@/pages/layout1-3/index.tsx";
import Layout131 from "@/pages/layout1-3-1/index.tsx";
import Layout132 from "@/pages/layout1-3-2/index.tsx";
import About1 from "../pages/About/About1.tsx";

const modules: Record<string, () => Promise<any>> = import.meta.glob("../pages/**/*.tsx");

export const createLazyComponent = (path: string) => {
    const Component = lazy(modules[`../pages/${path}.tsx`]);
    return <Component key={path} />;
};

const About = lazy(() => import("../pages/About/index.tsx"));
// const About1 = lazy(() => import("../pages/About/About1.tsx"));
const Home = lazy(() => import("../pages/Home/index"));

export const routes: RouteConfig[] = [
    {
        path: "/login",
        element: (
            // <RouterBeforeEach>
            <Login />
            // </RouterBeforeEach>
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
                meta: {
                    name: "Home页",
                },
            },
            {
                path: "about1",
                element: <About1 />,
            },
            {
                id: "user",
                path: "about",
                element: <About />,
                meta: { requireAuth: true },
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
                // element: <Layout />,
                componentPath: "layout1/index",
                redirect: "1",
                children: [
                    {
                        path: "1",
                        componentPath: "layout1-1/index",
                        element: <Layout11 />,
                        meta: { requireAuth: true },
                    },
                    {
                        path: "2",
                        componentPath: "/layout1-2/index",
                        element: <Layout2 />,
                        meta: { requireAuth: true },
                    },
                    {
                        path: "3",
                        element: <Layout3 />,
                        componentPath: "pages/layout1-3/index",
                        children: [
                            {
                                path: "1",
                                componentPath: "layout1-3-1/index",
                                element: <Layout131 />,
                                meta: { requireAuth: true },
                            },
                            {
                                path: "2",
                                componentPath: "layout1-3-2/index",
                                element: <Layout132 />,
                                meta: { requireAuth: true },
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

const asyncRoutes = normalizeRouteRecord(routes);

const router = createBrowserRouter(asyncRoutes);

export default router;
