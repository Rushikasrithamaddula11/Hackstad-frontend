// Header.jsx
import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ toggleSidebar, isSidebarOpen, onLogoClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 bg-white border-b shadow-sm">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? (
            <X size={28} className="text-gray-700" />
          ) : (
            <Menu size={28} className="text-gray-700" />
          )}
        </button>

        <button onClick={onLogoClick} className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            HACKSTAD
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;