import React from 'react';

export default function Leaderboard() {
  const teams = [
    { rank: 1, name: 'Team Alpha', points: 2500 },
    { rank: 2, name: 'Binary Bandits', points: 2350 },
    { rank: 3, name: 'Code Crushers', points: 2200 },
    { rank: 4, name: 'Debug Dragons', points: 2100 },
    { rank: 5, name: 'Error Eagles', points: 2000 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-black">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="border-b border-gray-500 bg-gray-200">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Team</th>
              <th className="px-6 py-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.rank} className={`border-b border-white-300 ${index % 2 === 0 ? 'bg-white-100' : 'bg-white'}`}>
                <td className="px-6 py-4">#{team.rank}</td>
                <td className="px-6 py-4">{team.name}</td>
                <td className="px-6 py-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
