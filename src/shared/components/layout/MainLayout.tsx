import { Outlet } from 'react-router-dom';

import Navbar from '../navigation/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
