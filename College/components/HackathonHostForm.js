import React, { useState, useCallback, memo } from 'react';
import { X, Upload, Calendar, Users, Mail, FileText, Image, Clock, CreditCard } from 'lucide-react';

// Memoized input components for better performance
const Input = memo(({ label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
  </div>
));

const Select = memo(({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
));

const FileUploadCard = memo(({ icon: Icon, title, name, accept, onChange, value }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{title}</label>
    <div className="relative">
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept={accept}
        className="hidden"
        id={`file-${name}`}
      />
      <label
        htmlFor={`file-${name}`}
        className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
      >
        <Icon className="w-8 h-8 text-gray-400" />
        <span className="mt-2 text-sm text-gray-500">
          {value ? value.name : `Upload ${title}`}
        </span>
      </label>
    </div>
  </div>
));

const SectionHeader = memo(({ icon: Icon, title }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-500" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="h-px bg-gray-200" />
  </div>
));

const HackathonHostForm = ({ onClose }) => {
  const initialFormData = {
    title: "",
    start_date: "",
    end_date: "",
    register_deadline: "",
    team: "",
    no_of_people_in_team: "",
    hackathon_type: "",
    hackathon_mode: "",
    registration_fee: "",
    location: "",
    max_participants: "",
    mentor_emails: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [files, setFiles] = useState({
    poster: null,
    problem_statements: null,
    payment_qr: null,
    timetable: null,
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({ ...prev, [name]: fileList[0] }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form validation
      const requiredFields = ['title', 'start_date', 'end_date', 'register_deadline', 'team'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      console.log('Form Data:', formData);
      console.log('Files:', files);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };



  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Host New Hackathon</h2>
              <p className="text-sm text-gray-500">Fill in the details to create your hackathon event</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-8 p-6" noValidate>
          {/* Basic Information */}
          <section className="space-y-6">
            <SectionHeader icon={Calendar} title="Basic Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Title *"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter hackathon title"
                required
              />
           
              <Input
                label="Start Date *"
                type="datetime-local"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                required
              />
              <Input
                label="End Date *"
                type="datetime-local"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                required
              />
                 <Input
                label="Registration Deadline *"
                type="datetime-local"
                name="register_deadline"
                value={formData.register_deadline}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          {/* Team Settings */}
          <section className="space-y-6">
            <SectionHeader icon={Users} title="Team Settings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Team Mode *"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
                options={[
                  { value: 'team', label: 'Team' },
                  { value: 'individual', label: 'Individual' }
                ]}
                required
              />
              {formData.team === "team" && (
                <Input
                  label="Team Size *"
                  type="number"
                  name="no_of_people_in_team"
                  value={formData.no_of_people_in_team}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              )}
            </div>
          </section>

          {/* Hackathon Settings */}
          <section className="space-y-6">
            <SectionHeader icon={CreditCard} title="Hackathon Settings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Type"
                name="hackathon_type"
                value={formData.hackathon_type}
                onChange={handleInputChange}
                options={[
                  { value: 'free', label: 'Free' },
                  { value: 'paid', label: 'Paid' }
                ]}
              />
              <Select
                label="Mode"
                name="hackathon_mode"
                value={formData.hackathon_mode}
                onChange={handleInputChange}
                options={[
                  { value: 'online', label: 'Online' },
                  { value: 'offline', label: 'Offline' }
                ]}
              />
              {formData.hackathon_type === "paid" && (
                <Input
                  label="Registration Fee"
                  type="number"
                  name="registration_fee"
                  value={formData.registration_fee}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="Enter amount"
                />
              )}
              {formData.hackathon_mode === "offline" && (
                <>
                  <Input
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter venue location"
                  />
                  <Input
                    label="Max Participants"
                    type="number"
                    name="max_participants"
                    value={formData.max_participants}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="Enter maximum capacity"
                  />
                </>
              )}
            </div>
          </section>

          {/* Additional Information */}
          <section className="space-y-6">
            <SectionHeader icon={Mail} title="Additional Information" />
            <div className="space-y-4">
              <Input
                label="Mentor Emails"
                name="mentor_emails"
                value={formData.mentor_emails}
                onChange={handleInputChange}
                placeholder="Enter comma separated email addresses"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter hackathon description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* File Uploads */}
          <section className="space-y-6">
            <SectionHeader icon={Upload} title="Required Documents" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadCard 
                icon={Image} 
                title="Poster" 
                name="poster" 
                accept="image/*"
                onChange={handleFileChange}
                value={files.poster}
              />
              <FileUploadCard 
                icon={FileText} 
                title="Problem Statements" 
                name="problem_statements" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                value={files.problem_statements}
              />
              {formData.hackathon_type === "paid" && (
                <FileUploadCard 
                  icon={CreditCard} 
                  title="Payment QR Code" 
                  name="payment_qr" 
                  accept="image/*"
                  onChange={handleFileChange}
                  value={files.payment_qr}
                />
              )}
              <FileUploadCard 
                icon={Clock} 
                title="Timetable" 
                name="timetable" 
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                value={files.timetable}
              />
            </div>
          </section>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Hackathon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HackathonHostForm;