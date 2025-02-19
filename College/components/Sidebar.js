import React from 'react';
import { Home, Users, Building2, Code, UserPen, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/college-dashboard/home' },
    { icon: Users, label: 'Students', path: '/college-dashboard/students' },
    { icon: Building2, label: 'Management', path: '/college-dashboard/management' },
    { icon: Code, label: 'Hackathons', path: '/college-dashboard/hackathons' },
    { icon: UserPen, label: 'CollegeProfile', path: '/college-dashboard/college-profile' }
  ];

  const handleLogout = () => {
    // Perform any logout logic if necessary
    navigate('/login');
  };

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r transition-all duration-300 ${
        isOpen ? 'w-72' : 'w-20'
      } z-40 flex flex-col justify-between`}
    >
      {/* Menu Items */}
      <div className="flex flex-col p-3 space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center p-4 rounded-lg transition-all duration-200 ${
              window.location.pathname === path
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            } ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
            title={!isOpen ? label : ''}
          >
            <Icon size={24} strokeWidth={1.5} />
            <span
              className={`whitespace-nowrap text-base ${
                isOpen ? 'opacity-100' : 'w-0 opacity-0'
              } transition-all duration-300`}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 ${
            isOpen ? 'justify-start space-x-4' : 'justify-center'
          }`}
          title={!isOpen ? 'Logout' : ''}
        >
          <LogOut size={24} strokeWidth={1.5} />
          <span
            className={`whitespace-nowrap text-base ${
              isOpen ? 'opacity-100' : 'w-0 opacity-0'
            } transition-all duration-300`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
