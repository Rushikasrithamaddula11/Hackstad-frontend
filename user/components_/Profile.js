import React, { useState, useRef } from 'react';
import { Trash2, Upload } from 'lucide-react';

// Profile Image Component
const ProfileImage = ({ profileImage, isEditing, onImageChange, onImageDelete }) => {
  const fileInputRef = useRef(null);

  return (
    <div className="relative">
      <img 
        src={profileImage}
        alt="Profile" 
        className="w-32 h-32 rounded-full border-4 border-green-300 cursor-pointer"
      />
      
      {isEditing && (
        <div className="absolute bottom-0 right-0 flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageChange}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors"
            title="Upload photo"
          >
            <Upload size={16} />
          </button>
          <button 
            onClick={onImageDelete}
            className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
            title="Delete photo"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// Form Field Component for Reusability
const FormField = ({ label, value, onChange, type = 'text', options, isEditing }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        type === 'select' ? (
          <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : (
          <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        )
      ) : (
        <span className="block text-sm text-gray-800">{value}</span>
      )}
    </div>
  );
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/api/placeholder/128/128');
  const [profile, setProfile] = useState({
    name: 'Dhanu',
    branch: 'cai',
    degree: 'Degree',
    college: 'kiet',
    dob: '2016-10-26',
    gender: 'Not provided',
    address: 'Not provided',
    year: '4'
  });

  const yearOptions = [1, 2, 3, 4].map((year) => ({
    value: year.toString(),
    label: year.toString()
  }));

  const genderOptions = [
    { value: 'Not provided', label: 'Not provided' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setProfileImage('/api/placeholder/128/128');
  };

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border-t-4 border-green-500">
      <div className="flex justify-between mb-4">
        <button
          onClick={isEditing ? handleSubmit : () => setIsEditing(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="flex items-center mb-6">
        <ProfileImage 
          profileImage={profileImage}
          isEditing={isEditing}
          onImageChange={handleImageUpload}
          onImageDelete={handleDeleteImage}
        />
        <div className="ml-6 flex-1">
          <FormField
            label="Name"
            value={profile.name}
            onChange={(value) => handleChange('name', value)}
            isEditing={isEditing}
          />
          <FormField
            label="Branch"
            value={profile.branch}
            onChange={(value) => handleChange('branch', value)}
            isEditing={isEditing}
          />
          <FormField
            label="Degree"
            value={profile.degree}
            onChange={(value) => handleChange('degree', value)}
            isEditing={isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
          <FormField
            label="Date of Birth"
            value={profile.dob}
            onChange={(value) => handleChange('dob', value)}
            type="date"
            isEditing={isEditing}
          />
          <FormField
            label="Gender"
            value={profile.gender}
            onChange={(value) => handleChange('gender', value)}
            type="select"
            options={genderOptions}
            isEditing={isEditing}
          />
          <FormField
            label="Address"
            value={profile.address}
            onChange={(value) => handleChange('address', value)}
            isEditing={isEditing}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
          <FormField
            label="Year"
            value={profile.year}
            onChange={(value) => handleChange('year', value)}
            type="select"
            options={yearOptions}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
