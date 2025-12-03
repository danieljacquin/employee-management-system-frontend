import { createBrowserRouter } from 'react-router-dom';

import Contact from '../../modules/contact/page/Contact';
import Home from '../../modules/home/page/Home';
import MainLayout from '../components/layout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
