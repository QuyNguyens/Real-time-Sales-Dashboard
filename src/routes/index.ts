// src/routes/index.tsx
import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const OrdersPage = lazy(() => import('../pages/Orders'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const UsersPage = lazy(() => import('../pages/Users'));
const FetchDataPage = lazy(() => import('../pages/FetchData'));
const SettingsPage = lazy(() => import('../pages/Settings'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const ServerWakingPage = lazy(() => import('../pages/ServerWakingPage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Layout),
    children: [
        {
            path: '',
            element: React.createElement(DashboardPage),
        },
        {
            path: '/orders',
            element: React.createElement(OrdersPage),
        },
         {
            path: '/products',
            element: React.createElement(ProductPage),
        },
        {
            path: '/users',
            element: React.createElement(UsersPage),
        },
        {
            path: '/fetch-data',
            element: React.createElement(FetchDataPage),
        },
        {
            path: '/settings',
            element: React.createElement(SettingsPage),
        }
    ]
  },
  {
    path: '/wake',
    element: React.createElement(ServerWakingPage),
  },
  {
    path: '*',
    element: React.createElement(NotFoundPage),
  },

];

export default routes;

