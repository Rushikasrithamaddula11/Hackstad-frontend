import React, { useState } from 'react';

const HackathonDetails = () => {
  const [activeTab, setActiveTab] = useState('registrations');

  // Sample data
  const stats = {
    totalParticipants: 156,
    teamsFormed: 32,
    projectIdeas: 28,
    submissions: 25
  };

  const registrations = [
    {
      id: 1,
      name: "John Doe",
      email: "john@college.edu",
      department: "Computer Science",
      year: "3rd",
      teamStatus: "assigned",
      paymentStatus: "paid",
      teamName: "Tech Wizards",
      registrationDate: "2024-03-10"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@college.edu",
      department: "Electrical Engineering",
      year: "2nd",
      teamStatus: "unassigned",
      paymentStatus: "unpaid",
      teamName: "Innovators",
      registrationDate: "2024-03-12"
    }
  ];

  const teams = [
    {
      id: 1,
      name: "Tech Wizards",
      lead: "John Doe",
      members: ["Alice Johnson", "Bob Wilson", "Carol Martinez"]
    },
    {
      id: 2,
      name: "Innovators",
      lead: "Jane Smith",
      members: ["David Brown", "Eva Chen"]
    }
  ];

  const submissions = [
    {
      id: 1,
      teamName: "Tech Wizards",
      projectName: "AI Assistant",
      submissionDate: "2024-03-16",
      status: "submitted"
    },
    {
      id: 2,
      teamName: "Innovators",
      projectName: "Smart IoT Solution",
      submissionDate: "2024-03-16",
      status: "pending"
    }
  ];

  const payments = [
    {
      id: 1,
      name: "John Doe",
      amount: 50,
      status: "approved",
      date: "2024-03-10"
    },
    {
      id: 2,
      name: "Jane Smith",
      amount: 50,
      status: "pending",
      date: "2024-03-12"
    }
  ];

  const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-emerald-500 text-xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Innovation Hack 2024</h1>
        <p className="text-gray-600 mt-2">2024-03-15 to 2024-03-17</p>
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm mt-2">Live</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Participants" value={stats.totalParticipants} icon="👥" />
        <StatCard title="Teams Formed" value={stats.teamsFormed} icon="🤝" />
        <StatCard title="Project Ideas" value={stats.projectIdeas} icon="💡" />
        <StatCard title="Submissions" value={stats.submissions} icon="📝" />
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {['registrations', 'teams', 'submissions', 'payments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {activeTab === 'registrations' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['ID', 'Name', 'Email', 'Department', 'Year', 'Team Status', 'Payment Status', 'Team Name', 'Registration Date'].map((header) => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.map((registration) => (
                  <tr key={registration.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registration.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registration.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        registration.teamStatus === 'assigned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {registration.teamStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        registration.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {registration.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.teamName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registration.registrationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonDetails;