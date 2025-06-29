import { NavLink } from 'react-router-dom';
import sidebarItems from '../data/sidebarItems';
import Logo from '../assets/react.svg';

const Sidebar = () => {
  return (
    <div className="w-16 md:w-48 bg-gray-800 border-r h-screen transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-1 justify-center items-center py-4 border-b border-gray-400">
        <img src={Logo} alt="Logo" className="w-8 h-8" />
        <span className="text-white text-xl hidden md:block">xintra</span>
      </div>
      <nav className="space-y-2 mt-4 px-2 md:px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-center md:justify-normal gap-3 px-2 md:px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 hover:text-black transition ${
                  isActive ? 'bg-gray-200' : 'text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
