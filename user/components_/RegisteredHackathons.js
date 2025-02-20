// Component: Registered Hackathons
import HackathonCard from './HackathonCard';

const RegisteredHackathons = () => {
  const registeredHackathons = [
    {
      id: 'hack-1',
      title: 'AI Innovation Challenge',
      description: 'Build innovative AI solutions for real-world problems',
      startDate: 'Mar 25, 2024',
      endDate: 'Mar 27, 2024',
      teamSize: '2-4',
      prizePool: 10000,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      timeLeft: '2 days left',
    },
    // Add more registered hackathons here
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Registered Hackathons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredHackathons.map((hackathon) => (
          <HackathonCard 
            key={hackathon.id} 
            hackathon={hackathon} 
            status="registered" 
          />
        ))}
      </div>
    </div>
  );
};

export default RegisteredHackathons;
