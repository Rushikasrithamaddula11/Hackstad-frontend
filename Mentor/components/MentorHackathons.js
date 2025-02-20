import React, { useState } from 'react';
import HackathonDetails from './HackathonDetails';
import HackathonsSection from './HackathonsSection';

const Hackathons = () => {
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const hackathons = {
    live: [
      {
        id: 1,
        title: 'AI Innovation Challenge',
        tagline: 'Building the Future with AI',
        participants: [
          {
            name: 'John Doe',
            college: 'MIT',
            phone: '+1 234-567-8900',
            email: 'john@mit.edu'
          },
          // Add more participants
        ],
        teams: [
          {
            name: 'Team Alpha',
            teamLead: 'John Doe',
            members: ['Jane Smith', 'Bob Wilson', 'Alice Brown']
          },
          // Add more teams
        ],
        submissions: [
          {
            teamName: 'Team Alpha',
            submissionDate: '2024-12-20',
            fileUrl: '#',
            status: 'pending'
          },
          // Add more submissions
        ],
        startDate: '2024-12-15',
        endDate: '2024-12-25',
        daysLeft: 5,
        prizePool: '$10,000',
        description: 'Join us in revolutionizing the future with AI. Build innovative solutions using cutting-edge AI technologies.',
        rules: [
          'Teams must consist of 2-4 members',
          'All code must be original and created during the hackathon',
          'Use of open-source libraries is permitted',
          'Final submissions must include source code and documentation'
        ]
      },
      // ... other live hackathons
    ],
    upcoming: [
      {
        id: 3,
        title: 'Mobile App Challenge',
        tagline: 'Innovate on the Go',
        participants: [],
        teams: [],
        submissions: [],
        startDate: '2024-12-28',
        endDate: '2024-12-31',
        startingIn: 7,
        prizePool: '$5,000',
        description: 'Create innovative mobile applications that solve real-world problems. Focus on user experience and practical utility.',
        rules: [
          'Apps must be compatible with both iOS and Android',
          'Include offline functionality',
          'Must follow platform-specific design guidelines',
          'Accessibility features are mandatory'
        ]
      },
      // ... other upcoming hackathons
    ],
    past: [
      {
        id: 5,
        title: 'IoT Solutions Hackathon',
        tagline: 'Connecting the Physical World',
        participants: [
          {
            name: 'Tom Wilson',
            college: 'CalTech',
            phone: '+1 234-567-8902',
            email: 'tom@caltech.edu'
          }
        ],
        teams: [
          {
            name: 'IoT Innovators',
            teamLead: 'Tom Wilson',
            members: ['Lisa Chen', 'James Moore', 'Rachel Kim']
          }
        ],
        submissions: [
          {
            teamName: 'IoT Innovators',
            submissionDate: '2024-12-15',
            fileUrl: '#',
            status: 'approved',
            marks: 95,
            feedback: 'Excellent implementation with comprehensive documentation'
          }
        ],
        startDate: '2024-12-10',
        endDate: '2024-12-15',
        prizePool: '$6,000',
        description: 'Create innovative IoT solutions that bridge the physical and digital worlds. Focus on practical applications and scalability.',
        rules: [
          'Must include working prototype',
          'Use standard IoT protocols',
          'Include power consumption analysis',
          'Address security concerns'
        ]
      },
      // ... other past hackathons
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {selectedHackathon ? (
        <HackathonDetails 
          hackathon={selectedHackathon} 
          onBack={() => setSelectedHackathon(null)} 
        />
      ) : (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Hackathon Dashboard</h1>
            <p className="text-xl text-gray-600">Discover, participate, and innovate in exciting hackathons</p>
          </div>
          <HackathonsSection 
            type="live" 
            hackathons={hackathons.live} 
            onHackathonClick={setSelectedHackathon} 
          />
          <HackathonsSection 
            type="upcoming" 
            hackathons={hackathons.upcoming} 
            onHackathonClick={setSelectedHackathon} 
          />
          <HackathonsSection 
            type="past" 
            hackathons={hackathons.past} 
            onHackathonClick={setSelectedHackathon} 
          />
        </>
      )}
    </div>
  );
};

export default Hackathons;