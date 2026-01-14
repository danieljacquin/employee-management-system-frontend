import { createBrowserRouter } from 'react-router-dom';

import Contact from '@/modules/contact/page/Contact';
import Employees from '@/modules/employee/pages/Employees';

import MainLayout from '../components/layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Employees /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
