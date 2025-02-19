// HackathonDashboard.js
import React, { useState } from 'react';
import HackathonHostForm from './HackathonHostForm';
import LiveHackathons from './LiveHackathons';
import UpcomingHackathons from './UpcomingHackathons';
import PastHackathons from './PastHackathons';
import HackathonDetails from './HackathonDetails';

const HackathonContent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [showHostForm, setShowHostForm] = useState(false);

  const hackathons = {
    upcoming: [
      {
        id: 1,
        title: 'Innovation Hack 2024',
        startDate: '2024-04-01',
        endDate: '2024-04-03',
        registeredCount: 75,
        mode: 'online',
        status: 'upcoming'
      }
    ],
    live: [
      {
        id: 2,
        title: 'Tech Sprint 2024',
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        registeredCount: 156,
        mode: 'hybrid',
        status: 'live',
        teamsFormed: 32,
        submissions: 25,
        progress: {
          registration: 100,
          teamFormation: 100,
          development: 75,
          finalSubmission: 0
        }
      }
    ],
    past: [
      {
        id: 3,
        title: 'Code Fest 2023',
        startDate: '2023-12-10',
        endDate: '2023-12-12',
        registeredCount: 120,
        mode: 'online',
        status: 'completed'
      }
    ]
  };

  const handleCardClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowDetails(true);
  };

  const handleHostFormSuccess = (newHackathon) => {
    setShowHostForm(false);
    hackathons.upcoming.unshift(newHackathon);
    setActiveTab('upcoming');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHostForm && (
          <HackathonHostForm
            onClose={() => setShowHostForm(false)}
            onSuccess={handleHostFormSuccess}
          />
        )}

        {!showDetails ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
              <button
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                onClick={() => setShowHostForm(true)}
              >
                <span className="mr-2">+</span> Host New Hackathon
              </button>
            </div>

            <div className="mb-6">
              <nav className="flex space-x-4 border-b border-gray-200">
                {['upcoming', 'live', 'past'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'text-emerald-600 border-b-2 border-emerald-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {hackathons[activeTab].length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No hackathons found in this category.</p>
              </div>
            ) : (
              <>
                {activeTab === 'upcoming' && (
                  <UpcomingHackathons
                    hackathons={hackathons.upcoming}
                    onCardClick={handleCardClick}
                  />
                )}
                {activeTab === 'live' && (
                  <LiveHackathons
                    hackathons={hackathons.live}
                    onCardClick={handleCardClick}
                  />
                )}
                {activeTab === 'past' && (
                  <PastHackathons
                    hackathons={hackathons.past}
                    onCardClick={handleCardClick}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <div>
            <button
              className="flex items-center text-emerald-600 mb-4 hover:text-emerald-700"
              onClick={() => setShowDetails(false)}
            >
              Back to Hackathons
            </button>
            <HackathonDetails hackathon={selectedHackathon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonContent;
