import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function MentorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'home', label: 'Home', path: '/mentor-dashboard/mentor-home' },
    { id: 'hackathons', label: 'Hackathons', path: '/mentor-dashboard/hackathons' },
    { id: 'quiz', label: 'Quiz', path: '/mentor-dashboard/quiz' },
    { id: 'chat', label: 'Chat', path: '/mentor-dashboard/chat' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Component */}
      <Header 
        isSidebarOpen={isSidebarOpen} 
        onSidebarToggle={() => setSidebarOpen(!isSidebarOpen)} 
      />

      <div className="flex flex-1">
        {/* Sidebar Component */}
        <Sidebar 
          isOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          onLogout={handleLogout}
          navItems={navItems} // Pass nav items to Sidebar
          activePath={location.pathname} // Track active route
        />

        {/* Main Content Area */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Outlet /> {/* Nested pages will render here */}
        </main>
      </div>
    </div>
  );
}

export default MentorDashboard;
