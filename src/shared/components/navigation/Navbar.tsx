import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="shrink-0">
            <span className="text-xl font-bold text-indigo-600">DJ CHALLANGE</span>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            <NavLink to="">Employee</NavLink>
            <NavLink to="contact">Contact</NavLink>
            <NavLink to="user">User</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
