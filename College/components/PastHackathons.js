// PastHackathons.js
import React from 'react';
import HackathonCard from './HackathonCard';

const PastHackathons = ({ hackathons, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hackathons.map((hackathon) => (
        <HackathonCard
          key={hackathon.id}
          hackathon={hackathon}
          onClick={() => onCardClick(hackathon)}
        />
      ))}
    </div>
  );
};

export default PastHackathons;