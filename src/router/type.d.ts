import { RouteObject } from 'react-router-dom';

export type RouteConfig = RouteObject & {
  name?: string;
  componentPath?: string;
  children?: RouteConfig[];
  meta?: {
    requireAuth: boolean;
  };
};

export type RouteConfigWithFullPath = Omit<RouteConfig, 'children'> & {
  fullPath?: string;
  children?: RouteConfigWithFullPath[];
};
