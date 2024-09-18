import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import { lazy } from "react";
import RouterBeforeEach from "./RouterBeforeEach";
import Login from "../pages/login";
import { RouteConfig, RouteConfigWithFullPath } from "./type";
import { generateRoutesWithFullPath, normalizeRouteRecord } from "./utils";
import { userLoader } from "../pages/About/userLoader.ts";
import { App1 } from "../App.tsx";
import Home from "../pages/Home/index.tsx";
import Layout1 from "@/pages/layout1/index.tsx";
import Layout11 from "@/pages/layout1-1/index.tsx";
import Layout2 from "@/pages/layout1-2/index.tsx";
import Layout3 from "@/pages/layout1-3/index.tsx";
import Layout131 from "@/pages/layout1-3-1/index.tsx";
import Layout132 from "@/pages/layout1-3-2/index.tsx";
import About1 from "../pages/About/About1.tsx";

const modules: Record<string, () => Promise<any>> = import.meta.glob(
    "../pages/**/*.tsx"
);

export const createLazyComponent = (path: string) => {
    const Component = lazy(modules[`../pages/${path}.tsx`]);
    return <Component key={path} />;
};

const About = lazy(() => import("../pages/About/index.tsx"));
// const About1 = lazy(() => import("../pages/About/About1.tsx"));

export const routes: RouteConfig[] = [
    {
        path: "/login",
        element: (
            // <RouterBeforeEach>
            <Login />
            // </RouterBeforeEach>
        ),
        meta: {
            name: "登录页",
        },
    },
    {
        path: "/",
        errorElement: <Error />,
        element: <App1 />,
        // element: (
        //   <RouterBeforeEach>
        //     <AppLayout />
        //   </RouterBeforeEach>
        // ),
        children: [
            { path: "", element: <Home /> },
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
            { path: "test", element: <Test /> },
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
            <RouterBeforeEach>
                <div>
                    settings <Outlet />
                </div>
            </RouterBeforeEach>
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
    { path: "*", element: <NotFound /> },
];

const routesWithFullPath = generateRoutesWithFullPath(routes);
console.log("routesWithFullPath: ", routesWithFullPath);

let rotuesMap = new Map<
    string,
    Pick<RouteConfigWithFullPath, "meta" | "fullPath" | "path" | "redirect">
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
console.log("rotuesMap: ", rotuesMap);

const asyncRoutes = normalizeRouteRecord(routes);

const router = createBrowserRouter(asyncRoutes);

export default router;

export { rotuesMap };
