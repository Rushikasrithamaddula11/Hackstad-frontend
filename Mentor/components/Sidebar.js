import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Award, Book, MessageSquare } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { id: 'mentor-home', icon: Home, label: 'Home' },
    { id: 'mentor-hackathons', icon: Award, label: 'Hackathons' },
    { id: 'quiz', icon: Book, label: 'Create Quiz' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' }
  ];

  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={`/mentor-dashboard/${to}`}
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600'
            : 'hover:bg-gray-50 text-gray-700'
        }`
      }
    >
      <Icon size={20} />
      {isOpen && <span className="ml-3">{label}</span>}
    </NavLink>
  );

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white shadow-lg transition-all duration-300 h-[calc(100vh-64px)] fixed flex flex-col`}
    >
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(({ id, icon, label }) => (
            <li key={id}>
              <NavItem to={id} icon={icon} label={label} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
