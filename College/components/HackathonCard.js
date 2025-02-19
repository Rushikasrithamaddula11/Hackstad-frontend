// HackathonCard.js
import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HackathonCard = ({ hackathon, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold">{hackathon.title}</h3>
      {hackathon.status === 'upcoming' && (
        <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
          Upcoming
        </span>
      )}
      {hackathon.status === 'live' && (
        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
          Live
        </span>
      )}
      {hackathon.status === 'completed' && (
        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
          Completed
        </span>
      )}
    </div>
    <div className="space-y-2 text-gray-600">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{`${hackathon.startDate} to ${hackathon.endDate}`}</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-2" />
        <span>{`${hackathon.registeredCount} Registered`}</span>
      </div>
      <div className="flex items-center">
        <span className="capitalize">{hackathon.mode}</span>
      </div>
    </div>
    <Link to={`/college-dashboard/hackathons/${hackathon.id}`}>
    <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors">
      View Details
    </button>
    </Link>
  </div>
);

export default HackathonCard;