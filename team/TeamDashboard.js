import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, LogOut, Users } from 'lucide-react';
import { Outlet } from 'react-router-dom'; // Import Outlet

function TeamDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/team-dashboard/team-home' },
    { id: 'chat', label: 'Team Chat', path: '/team-dashboard/team-chat' },
    { id: 'problem', label: 'Problem Statement', path: '/team-dashboard/problem-statement' },
    { id: 'submit', label: 'Submit Project', path: '/team-dashboard/submit-project' },
    { id: 'leaderboard', label: 'Leaderboard', path: '/team-dashboard/leaderboard' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const userMenu = document.getElementById('user-menu');
      if (userMenu && !userMenu.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/login-student'); // Redirect to login page
  };

  const handleTeam = () => {
    navigate('/user-dashboard/team'); // Redirect to team page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-8 border-b border-gray-100">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HackStad
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)} // Update to use navigate() instead of direct links
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="ml-3">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User section */}
          <div className="relative border-t border-gray-100 p-4" id="user-menu">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <div className="ml-3 flex-1 text-left">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {/* User menu dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                <button
                  onClick={handleTeam}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Users size={16} className="mr-2" />
                  Team
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`transition-all duration-300 ${isOpen ? 'lg:ml-64' : ''}`}>
        <div className="p-4 lg:p-8">
          <Outlet /> {/* This will render the nested components here */}
        </div>
      </main>
    </div>
  );
}

export default TeamDashboard;
