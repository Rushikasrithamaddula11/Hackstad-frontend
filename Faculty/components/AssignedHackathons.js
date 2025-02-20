import React, { useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import Leaderboard from '../Leaderboard';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const AssignedHackathons = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [view, setView] = useState('analysis');

  const hackathons = [
    {
      id: 1,
      name: 'Hackathon 1',
      image: 'https://via.placeholder.com/150',
      studentCount: 120,
      mentorName: 'Emily Davis',
      teamCount: 40,
      submissions: 50,
      payments: 100,
      isOnline: true,
      room: 'Online',
    },
  ];

  const pastHackathons = [
    {
      id: 2,
      name: 'Past Hackathon 1',
      image: 'https://via.placeholder.com/150',
      studentCount: 180,
      mentorName: 'Michael Scott',
      teamCount: 40,
    },
  ];

  const leaderboardData = [
    { name: 'Team Alpha', points: 95 },
    { name: 'Team Beta', points: 90 },
    { name: 'Team Gamma', points: 85 },
    { name: 'Team Delta', points: 80 },
    { name: 'Team Epsilon', points: 75 },
  ];

  return (
    <div className="p-6">
      {!selectedHackathon ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Assigned Hackathons</h1>
          <div className="grid grid-cols-2 gap-6 mb-10">
            {hackathons.map((hackathon) => (
              <div key={hackathon.id} className="bg-white p-4 shadow-md rounded-lg">
                <img src={hackathon.image} alt={hackathon.name} className="w-full h-40 object-cover" />
                <h2 className="text-xl font-semibold mt-2">{hackathon.name}</h2>
                <button
                  onClick={() => setSelectedHackathon(hackathon)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  View
                </button>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">Past Hackathons</h2>
          <div className="grid grid-cols-2 gap-6">
            {pastHackathons.map((hackathon) => (
              <div key={hackathon.id} className="bg-white p-4 shadow-md rounded-lg">
                <img src={hackathon.image} alt={hackathon.name} className="w-full h-40 object-cover" />
                <h2 className="text-xl font-semibold mt-2">{hackathon.name}</h2>
                <button
                  onClick={() => setSelectedHackathon(hackathon)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center gap-60">
            <button onClick={() => setSelectedHackathon(null)} className="text-lg font-semibold text-gray-700">
              back
            </button>
            <h1 className="text-3xl font-bold">{selectedHackathon.name}</h1>
          </div>

          <div className="flex space-x-4 mt-4">
            {['analysis', 'allocation', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`px-4 py-2 rounded ${
                  view === tab ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {view === 'analysis' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {['Registrations', 'Submissions', 'Payments', 'Teams Formed'].map((label, index) => (
                  <div key={index} className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-gray-700">{label}</h3>
                    <p className="text-2xl font-semibold text-blue-600">
                      {[selectedHackathon.studentCount, selectedHackathon.submissions, selectedHackathon.payments, selectedHackathon.teamCount][index]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {['Registrations', 'Submissions', 'Payments', 'Teams Formed'].map((label, index) => (
                  <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">{label} Trend</h3>
                    <Line
                      data={{
                        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                        datasets: [
                          {
                            label: label,
                            data: [10, 20, 30, 40, [selectedHackathon.studentCount, selectedHackathon.submissions, selectedHackathon.payments, selectedHackathon.teamCount][index]],
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 2,
                          },
                        ],
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'allocation' && (
            <div className="mt-6">
              {selectedHackathon.isOnline ? <p>No allocations since this hackathon is online.</p> : <p>Room: {selectedHackathon.room}</p>}
            </div>
          )}

          {view === 'leaderboard' && <Leaderboard leaderboardData={leaderboardData} />}
        </div>
      )}
    </div>
  );
};

export default AssignedHackathons;
