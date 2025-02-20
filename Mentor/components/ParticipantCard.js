import React from 'react';
import { User, Building, Phone, Mail } from 'lucide-react';

const ParticipantCard = ({ participant }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-gray-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{participant.name}</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            {participant.college}
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {participant.phone}
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            {participant.email}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ParticipantCard;