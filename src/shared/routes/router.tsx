import { createBrowserRouter, Navigate } from 'react-router-dom';

import Contact from '@/modules/contact/page/Contact';
import Employees from '@/modules/employee/pages/Employees';

import MainLayout from '../components/layout/MainLayout';
import { Routes } from '../types/routes.type';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={Routes.employees} /> },
      { path: Routes.employees, element: <Employees /> },
      { path: Routes.contact, element: <Contact /> },
    ],
  },
]);
