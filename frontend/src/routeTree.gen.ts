/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedCreateImport } from './routes/_authenticated/create'
import { Route as AuthenticatedEditIdImport } from './routes/_authenticated/edit/$id'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCreateRoute = AuthenticatedCreateImport.update({
  path: '/create',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedEditIdRoute = AuthenticatedEditIdImport.update({
  path: '/edit/$id',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/create': {
      id: '/_authenticated/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof AuthenticatedCreateImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/edit/$id': {
      id: '/_authenticated/edit/$id'
      path: '/edit/$id'
      fullPath: '/edit/$id'
      preLoaderRoute: typeof AuthenticatedEditIdImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedCreateRoute: typeof AuthenticatedCreateRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedEditIdRoute: typeof AuthenticatedEditIdRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedCreateRoute: AuthenticatedCreateRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedEditIdRoute: AuthenticatedEditIdRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/create': typeof AuthenticatedCreateRoute
  '/': typeof AuthenticatedIndexRoute
  '/edit/$id': typeof AuthenticatedEditIdRoute
}

export interface FileRoutesByTo {
  '/create': typeof AuthenticatedCreateRoute
  '/': typeof AuthenticatedIndexRoute
  '/edit/$id': typeof AuthenticatedEditIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_authenticated/create': typeof AuthenticatedCreateRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/edit/$id': typeof AuthenticatedEditIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/create' | '/' | '/edit/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/create' | '/' | '/edit/$id'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authenticated/create'
    | '/_authenticated/'
    | '/_authenticated/edit/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/create",
        "/_authenticated/",
        "/_authenticated/edit/$id"
      ]
    },
    "/_authenticated/create": {
      "filePath": "_authenticated/create.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/edit/$id": {
      "filePath": "_authenticated/edit/$id.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
