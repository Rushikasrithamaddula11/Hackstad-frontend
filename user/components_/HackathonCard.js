import PropTypes from 'prop-types';
import { FaCalendar, FaUsers, FaTrophy, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// HackathonCard Component
const HackathonCard = ({ hackathon, status }) => {
  const { 
    id,
    title, 
    description, 
    startDate, 
    endDate, 
    teamSize, 
    prizePool,
    image,
    timeLeft 
  } = hackathon;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <HackathonStatus status={status} />
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FaCalendar className="w-4 h-4 mr-2" />
            <span>{startDate} - {endDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>Team Size: {teamSize}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaTrophy className="w-4 h-4 mr-2" />
            <span>Prize Pool: ${prizePool}</span>
          </div>
          {timeLeft && (
            <div className="flex items-center text-gray-600">
              <FaClock className="w-4 h-4 mr-2" />
              <span>{timeLeft}</span>
            </div>
          )}
        </div>

        <RegisterButton status={status} hackathonId={id} />
      </div>
    </div>
  );
};

HackathonCard.propTypes = {
  hackathon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    teamSize: PropTypes.string.isRequired,
    prizePool: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    timeLeft: PropTypes.string
  }).isRequired,
  status: PropTypes.oneOf(['registered', 'upcoming', 'ongoing', 'past']).isRequired
};

// HackathonStatus Component
const HackathonStatus = ({ status }) => {
  const statusStyles = {
    registered: 'bg-green-50 text-green-600',
    upcoming: 'bg-blue-50 text-blue-600',
    ongoing: 'bg-yellow-50 text-yellow-600',
    past: 'bg-gray-50 text-gray-600'
  };

  const statusText = {
    registered: 'Registered',
    upcoming: 'Upcoming',
    ongoing: 'Live Now',
    past: 'Completed'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

HackathonStatus.propTypes = {
  status: PropTypes.oneOf(['registered', 'upcoming', 'ongoing', 'past']).isRequired
};

// RegisterButton Component
const RegisterButton = ({ status, hackathonId }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/user-dashboard/hackathons/upcoming/${hackathonId}`);
    console.log('Registering for hackathon:', hackathonId);
  };

  const handleViewDetails = () => {
    console.log('Viewing details for hackathon:', hackathonId);
  };

  if (status === 'registered') {
    return (
      <button 
        onClick={handleViewDetails}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        View Dashboard
      </button>
    );
  }

  if (status === 'upcoming') {
    return (
      <button 
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Register Now
      </button>
    );
  }

  if (status === 'ongoing') {
    return (
      <button 
        onClick={handleViewDetails}
        className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors"
      >
        View Live
      </button>
    );
  }

  return (
    <button 
      onClick={handleViewDetails}
      className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
    >
      View Results
    </button>
  );
};

RegisterButton.propTypes = {
  status: PropTypes.oneOf(['registered', 'upcoming', 'ongoing', 'past']).isRequired,
  hackathonId: PropTypes.string.isRequired
};

export default HackathonCard;
