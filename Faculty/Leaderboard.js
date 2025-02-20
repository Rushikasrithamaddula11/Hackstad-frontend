import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Leaderboard = ({ leaderboardData }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const rankColors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];

  // Sample team details (Replace with real data)
  const teamDetails = {
    'Team Alpha': { members: ['Alice', 'Bob'], emails: ['alice@example.com', 'bob@example.com'] },
    'Team Beta': { members: ['Charlie', 'David'], emails: ['charlie@example.com', 'david@example.com'] },
    'Team Gamma': { members: ['Eve', 'Frank'], emails: ['eve@example.com', 'frank@example.com'] },
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🏆 Leaderboard</h2>
      <ul className="space-y-4">
        {leaderboardData.length > 0 ? (
          leaderboardData.map((team, index) => (
            <motion.li
              key={index}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
              onClick={() => setSelectedTeam(team)}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-xl font-bold ${rankColors[index] || 'text-gray-700'}`}>
                  {index + 1}.
                </span>
                <span className="text-lg font-semibold text-gray-800">{team.name}</span>
              </div>
              <motion.span
                className="text-xl font-bold text-blue-600"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {team.points} Points
              </motion.span>
            </motion.li>
          ))
        ) : (
          <motion.p
            className="text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No leaderboard data available.
          </motion.p>
        )}
      </ul>

      {/* Modal for Team Details */}
      <AnimatePresence>
        {selectedTeam && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTeam(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedTeam.name} Details</h3>
              <ul className="space-y-2">
                {teamDetails[selectedTeam.name]?.members.map((member, idx) => (
                  <li key={idx} className="text-gray-700">
                    <span className="font-semibold">{member}</span> - {teamDetails[selectedTeam.name].emails[idx]}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => setSelectedTeam(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;
