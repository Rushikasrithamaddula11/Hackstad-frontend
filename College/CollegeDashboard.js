// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Menu, X, Home, Code, Calendar, Users, History, DollarSign, FileText, User } from 'lucide-react';
// import HomeContent from './components/HomeContent';
// import HostHackathonContent from './components/HostHackathonContent';
// import HackathonSchedule from './components/HackathonSchedule';
// import ManagementPersons from './components/ManagementPersons';
// import PastEvents from './components/PastEvents';
// import TransactionApproval from './components/TransactionApproval';
// import ProblemStatements from './components/ProblemStatements';

// // Header Component with Logout dropdown
// const Header = ({ toggleSidebar, isSidebarOpen }) => {
//   const navigate = useNavigate();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [collegeName, setCollegeName] = useState('');

//   // Fetch college profile and update the state
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = '/college-login'; // Redirect to login if no token
//       return;
//     }

//     const fetchCollegeName = async () => {
//       try {
//         const response = await fetch('/collegeprofile', {
//           headers: {
//             'Authorization': `Bearer ${token}`, // Add token if needed for auth
//           },
//         });
//         const data = await response.json();
//         console.log(data); // Check the response in the console
//         if (data.College_name) {
//           setCollegeName(data.College_name); // Set the college name in state
//         }
//       } catch (error) {
//         console.error('Error fetching college profile:', error);
//       }
//     };

//     fetchCollegeName();

//     const handleClickOutside = (event) => {
//       const userMenu = document.getElementById('user-menu');
//       if (userMenu && !userMenu.contains(event.target)) {
//         setShowUserMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     navigate('/college-login'); // Redirect to login page
//   };

//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 h-16 flex justify-between items-center px-4 bg-white border-b shadow-sm">
//       <button 
//         onClick={toggleSidebar}
//         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//         aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
//       >
//         {isSidebarOpen ? 
//           <X size={28} className="text-gray-700" /> : 
//           <Menu size={28} className="text-gray-700" />
//         }
//       </button>
      
//       <div className="relative flex items-center space-x-4">
//         <div 
//           onClick={() => setShowUserMenu(!showUserMenu)} 
//           className="cursor-pointer text-sm text-gray-700"
//         >
//           {collegeName || 'College Name'} {/* Display the actual college name */}
//         </div>
        
//         <div 
//           onClick={() => setShowUserMenu(!showUserMenu)} 
//           className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
//         >
//           <User className="text-gray-700" size={24} />
//         </div>

//         {/* Dropdown Menu */}
//         {showUserMenu && (
//           <div 
//             id="user-menu"
//             className="absolute top-14 right-0 w-40 bg-white border rounded-lg shadow-lg z-50"
//           >
//             <button 
//               onClick={handleLogout} 
//               className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// // Sidebar Component
// const Sidebar = ({ isOpen, activeTab, setActiveTab }) => {
//   const menuItems = [
//     { icon: Home, label: 'Home', id: 'home' },
//     { icon: Code, label: 'Host Hackathon', id: 'host' },
//     { icon: Calendar, label: 'Hackathon Schedule', id: 'schedule' },
//     { icon: Users, label: 'Add Management Persons', id: 'management' },
//     { icon: History, label: 'Past Events', id: 'events' },
//     { icon: DollarSign, label: 'Transaction Approval', id: 'transactions' },
//     { icon: FileText, label: 'Problem Statements', id: 'problems' }
//   ];

//   return (
//     <div className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r transition-all duration-300 ${isOpen ? 'w-72' : 'w-20'} z-40`}>
//       <div className="flex flex-col p-3 space-y-2">
//         {menuItems.map(({ icon: Icon, label, id }) => (
//           <button
//             key={id}
//             onClick={() => setActiveTab(id)}
//             className={`flex items-center p-4 rounded-lg transition-all duration-200 ${activeTab === id ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
//             title={!isOpen ? label : ''}
//           >
//             <Icon size={24} strokeWidth={1.5} />
//             <span className={`whitespace-nowrap text-base ${isOpen ? 'opacity-100' : 'w-0 opacity-0'} transition-all duration-300`}>
//               {label}
//             </span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Main Dashboard Component
// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState('home');

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'home':
//         return <HomeContent />;
//       case 'host':
//         return <HostHackathonContent />;
//       case 'schedule':
//         return <HackathonSchedule />;
//       case 'management':
//         return <ManagementPersons />;
//       case 'events':
//         return <PastEvents />;
//       case 'transactions':
//         return <TransactionApproval />;
//       case 'problems':
//         return <ProblemStatements />;
//       default:
//         return (
//           <div className="p-6">
//             <div className="flex items-center space-x-3 mb-6">
//               <FileText size={28} className="text-gray-700" strokeWidth={1.5} />
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//               </h2>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-sm border">
//               <p className="text-gray-600">Content for {activeTab} tab...</p>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
//       <Sidebar 
//         isOpen={isSidebarOpen} 
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
      
//       <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
//         {renderContent()}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


// Dashboard.jsx
import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const CollegeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (

      <div className="min-h-screen bg-gray-50">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <Sidebar isOpen={isSidebarOpen} />

        <main
          className={`pt-16 transition-all duration-300 ${
            isSidebarOpen ? 'ml-72' : 'ml-20'
          }`}
        >

            <Outlet />
      
        </main>
      </div>

  );
};

export default CollegeDashboard;