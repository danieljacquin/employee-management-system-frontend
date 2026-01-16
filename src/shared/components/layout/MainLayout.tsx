import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/SideBar';

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[64px_1fr] h-screen">
      <Navbar />
      <div className="grid grid-cols-[230px_1fr]">
        <Sidebar />
        <main className="flex flex-col py-8 px-6 overflow-hidden min-h-0">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
