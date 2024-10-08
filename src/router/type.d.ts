import { RouteObject } from "react-router-dom";

export type RouteConfig = RouteObject & {
    name?: string;
    redirect?: string;
    componentPath?: string;
    children?: RouteConfig[];
    handle?: {
        meta?: {
            requireAuth?: boolean;
            title?: string;
        };
    };
};

export type RouteConfigWithFullPath = Omit<RouteConfig, "children"> & {
    fullPath?: string;
    children?: RouteConfigWithFullPath[];
};
