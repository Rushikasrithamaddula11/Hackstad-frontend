import React, { useState } from 'react';
import { Calendar, Clock, Users, Globe, MapPin, CreditCard, Building, ChevronRight, Check } from 'lucide-react';

const HackathonDetails = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleEnroll = () => {
    if (!isEnrolled) {
      setIsEnrolled(true);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  const hackathonDetails = {
    title: "TechNova Hackathon 2024",
    organization: "Tech University",
    registrationStart: "January 15, 2024",
    registrationDeadline: "February 10, 2024",
    hackathonStart: "February 15, 2024 9:00 AM",
    hackathonEnd: "February 16, 2024 9:00 PM",
    participationType: "Team (2-4 members)",
    mode: "Hybrid (Online & Offline)",
    fee: "Free",
    venue: "Tech University Main Campus, Innovation Hub",
    about: `Join us for TechNova Hackathon 2024, where innovation meets opportunity! This 36-hour hackathon brings together the brightest minds to solve real-world challenges using cutting-edge technology. Whether you're a coding wizard, a design maverick, or a problem-solving enthusiast, TechNova is your platform to shine.

    Our state-of-the-art Innovation Hub will host participants from across the globe, providing the perfect environment for collaboration and creativity. With mentorship from industry experts, workshops, and amazing prizes, this is more than just a hackathon - it's a launchpad for your next big idea!`,
    prizes: [
      "First Prize: $5000 + Incubation Support",
      "Second Prize: $3000 + Cloud Credits",
      "Third Prize: $1500 + Development Tools",
      "Best Innovation Award: $1000",
    ],
    themes: [
      "AI/ML Solutions",
      "Sustainable Technology",
      "HealthTech Innovation",
      "Smart Cities",
      "Blockchain Applications"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-end pb-8">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {hackathonDetails.title}
              </h1>
              <p className="text-xl opacity-90">Hosted by {hackathonDetails.organization}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold mb-4">Key Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Registration Opens</p>
                    <p className="font-medium">{hackathonDetails.registrationStart}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Registration Deadline</p>
                    <p className="font-medium">{hackathonDetails.registrationDeadline}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Event Duration</p>
                    <p className="font-medium">36 Hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Participation Type</p>
                    <p className="font-medium">{hackathonDetails.participationType}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Mode</p>
                    <p className="font-medium">{hackathonDetails.mode}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Registration Fee</p>
                    <p className="font-medium">{hackathonDetails.fee}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About the Hackathon</h2>
              <p className="text-gray-700 whitespace-pre-line">{hackathonDetails.about}</p>
            </div>

            {/* Themes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Themes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hackathonDetails.themes.map((theme, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span>{theme}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prize Pool */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Prize Pool</h2>
              <div className="space-y-3">
                {hackathonDetails.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-600" />
                    <span>{prize}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Ready to Innovate?</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Venue</p>
                    <p className="font-medium">{hackathonDetails.venue}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Organizer</p>
                    <p className="font-medium">{hackathonDetails.organization}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolled}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2
                    ${isEnrolled 
                      ? 'bg-green-500 text-white cursor-default hover:bg-green-500' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {isEnrolled ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Enrolled</span>
                    </>
                  ) : (
                    'Enroll Now'
                  )}
                </button>

                {/* Success Message Toast */}
                <div
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full 
                    ${showSuccessMessage ? 'opacity-100 translate-y-[-120%]' : 'opacity-0 translate-y-[-100%]'}
                    transition-all duration-300 ease-in-out`}
                >
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg border border-green-200 flex items-center space-x-2">
                    <Check className="w-4 h-4" />
                    <span>Successfully enrolled!</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                Registration deadline: {hackathonDetails.registrationDeadline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;