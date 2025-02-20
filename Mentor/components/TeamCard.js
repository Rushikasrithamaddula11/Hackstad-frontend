import React, { useState } from 'react';
import { User } from 'lucide-react';

const TeamCard = ({ team }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{team.name}</h4>
          <p className="text-gray-600">Lead: {team.teamLead}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <h5 className="font-semibold text-gray-700">Team Members:</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.members.map((member, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>{member}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCard;