import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function Home() {
  // Sample team members data
  const teamMembers = [
    { name: 'Alice', status: 'Active' },
    { name: 'Bob', status: 'Inactive' },
    { name: 'Charlie', status: 'Active' },
    { name: 'David', status: 'Active' }
  ];

  // Create a navigate function to redirect to different pages
  const navigate = useNavigate();

  const handleJoinChat = () => {
    navigate('/chat'); // Navigate to the Team Chat page
  };

  const handleViewProblemStatement = () => {
    navigate('/problem'); // Navigate to the Problem Statement page
  };

  return (
    <div className="space-y-6">
      {/* Team Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Team Status</h3>
        <div className="text-green-500 font-semibold">Active</div>
        <p className="text-gray-400 mt-2">4/4 members online</p>
      </div>

      {/* Team Members Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Team Members</h3>
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg">
              <span className="text-gray-800">{member.name}</span>
              <span className={`text-sm ${member.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
