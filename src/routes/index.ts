// src/routes/index.tsx
import React, { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const OrdersPage = lazy(() => import('../pages/Orders'));
const UsersPage = lazy(() => import('../pages/Users'));
const FetchDataPage = lazy(() => import('../pages/FetchData'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

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
            path: '/users',
            element: React.createElement(UsersPage),
        },
        {
            path: '/fetch-data',
            element: React.createElement(FetchDataPage),
        }
    ]
  },
  {
    path: '*',
    element: React.createElement(NotFoundPage),
  },

];

export default routes;

