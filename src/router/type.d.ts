import { RouteObject } from 'react-router-dom';

export type RouteConfig = RouteObject & {
  name?: string;
  redirect?: string;
  componentPath?: string;
  children?: RouteConfig[];
  meta?: {
    requireAuth?: boolean;
    name?: string;
  };
};

export type RouteConfigWithFullPath = Omit<RouteConfig, 'children'> & {
  fullPath?: string;
  children?: RouteConfigWithFullPath[];
};
