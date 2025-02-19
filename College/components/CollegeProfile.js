import React from 'react';
import { FaUniversity, FaEnvelope, FaPhone, FaUser, FaEdit, FaMapMarkerAlt, 
         FaGlobe, FaTrophy, FaUsers, FaLaptopCode, FaCalendar } from 'react-icons/fa';

const CollegeProfile = () => {
  const contactData = {
    college: {
      email: "info@mit.edu",
      phone: "+1 (617) 253-1000"
    },
    principal: {
      name: "Dr. John Smith",
      email: "principal@mit.edu",
      phone: "+1 (617) 253-1001"
    },
    poc: {
      name: "Jane Doe",
      email: "jane.doe@mit.edu",
      phone: "+1 (617) 253-1002"
    }
  };

  const collegeData = {
    name: "MIT Institute of Technology",
    id: "MIT2024",
    type: "Private Research University",
    address: "77 Massachusetts Avenue, Cambridge, MA 02139",
    website: "https://mit.edu",
  };

  const stats = [
    {
      icon: <FaUsers className="text-blue-600" />,
      label: "Total Students",
      value: "11,000+"
    },
    {
      icon: <FaLaptopCode className="text-purple-600" />,
      label: "Tech Programs",
      value: "25+"
    },
    {
      icon: <FaTrophy className="text-yellow-600" />,
      label: "Hackathon Wins",
      value: "15+"
    },
    {
      icon: <FaCalendar className="text-green-600" />,
      label: "Events Hosted",
      value: "50+"
    }
  ];

  const ProfileHeader = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 relative">
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg">
          <FaEdit className="text-gray-600" />
        </button>
      </div>
      <div className="p-6 relative">
        <div className="absolute -top-16 left-6">
          <img
            src="https://via.placeholder.com/128"
            alt="College logo"
            className="w-32 h-32 rounded-lg border-4 border-white shadow-lg bg-white"
          />
        </div>
        <div className="ml-40">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-800">{collegeData.name}</h1>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  ID: {collegeData.id}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-600">
                <span className="flex items-center gap-1">
                  <FaUniversity /> {collegeData.type}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {collegeData.address}
                </span>
              </div>
            </div>
            <a
              href={collegeData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <FaGlobe /> Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const CollegeDetails = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FaUniversity className="text-blue-600" />
        College Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">College Type</h3>
            <p className="mt-1 text-gray-900">Private Research University</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Established Year</h3>
            <p className="mt-1 text-gray-900">1861</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Campus Area</h3>
            <p className="mt-1 text-gray-900">168 acres</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Accreditation</h3>
            <p className="mt-1 text-gray-900">NAAC A++ Grade</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Recognition</h3>
            <p className="mt-1 text-gray-900">UGC, AICTE Approved</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="mt-1 text-gray-900">Cambridge, Massachusetts</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FaUser className="text-blue-600" />
        Contact Information
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">College Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-600" />
              <a href={`mailto:${contactData.college.email}`} className="hover:text-blue-600">
                {contactData.college.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-blue-600" />
              <a href={`tel:${contactData.college.phone}`} className="hover:text-blue-600">
                {contactData.college.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Principal</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUser className="text-blue-600" />
              <span>{contactData.principal.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-600" />
              <a href={`mailto:${contactData.principal.email}`} className="hover:text-blue-600">
                {contactData.principal.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-blue-600" />
              <a href={`tel:${contactData.principal.phone}`} className="hover:text-blue-600">
                {contactData.principal.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Point of Contact</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUser className="text-blue-600" />
              <span>{contactData.poc.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-600" />
              <a href={`mailto:${contactData.poc.email}`} className="hover:text-blue-600">
                {contactData.poc.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-blue-600" />
              <a href={`tel:${contactData.poc.phone}`} className="hover:text-blue-600">
                {contactData.poc.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StatsOverview = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {stat.icon}
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Winter Hackathon 2024</h3>
            <p className="text-sm text-gray-600">January 15-17, 2024</p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
              Register Now
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Tech Workshop Series</h3>
            <p className="text-sm text-gray-600">Every Saturday</p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
              Join Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <ProfileHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <CollegeDetails />
          <ContactInfo />
        </div>
        <div className="lg:col-span-1">
          <StatsOverview />
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;