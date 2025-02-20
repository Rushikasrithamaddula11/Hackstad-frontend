import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HackathonCard from './HackathonCard';

// Custom Hook: Fetch Upcoming Hackathons
const useFetchUpcomingHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to get the base URL dynamically
  const getBaseURL = () => {
    const ip = window.location.hostname;
    return `http://${ip}:8000`;
  };

  // Fetch hackathons
  useEffect(() => {
    const fetchUpcomingHackathons = async () => {
      try {
        const response = await fetch(`${getBaseURL()}/live_hackathons`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        const upcomingHackathons = data.map(h => ({
          id: h._id,
          title: h.title,
          date: h.start_date,
          description: h.description,
        }));

        setHackathons(upcomingHackathons);
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingHackathons();
  }, []);

  // Navigate to hackathon details
  const handleDetailsClick = (hackathonTitle) => {
    navigate(`/user-dashboard/hackathon_details?title=${encodeURIComponent(hackathonTitle)}`);
  };

  return { hackathons, loading, error, handleDetailsClick };
};

// Component: Upcoming Hackathons
const UpcomingHackathons = () => {
  const { hackathons, loading, error, handleDetailsClick } = useFetchUpcomingHackathons();

  if (loading) {
    return <div className="p-6">Loading hackathons...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Hackathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon}
            status="upcoming"
            onClick={() => handleDetailsClick(hackathon.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingHackathons;
