import { IdCardLanyard, Contact } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { Routes } from '@/shared/types/routes.type';

const sidebarLinks = [
  {
    label: 'Employees',
    to: Routes.employees,
    icon: IdCardLanyard,
  },
  {
    label: 'Contact',
    to: Routes.contact,
    icon: Contact,
  },
];

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-200 shadow-sm">
      <menu className="flex flex-col my-1">
        {sidebarLinks.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            className={({ isActive }) =>
              `py-2 px-4 flex items-center gap-2 border-l-4 border-transparent ${isActive && 'bg-[#EAFFFF] border-l-[#01BABB]'}`
            }
            to={to}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </menu>
    </aside>
  );
};

export default Sidebar;
