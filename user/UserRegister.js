import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    rollnum: '',
    college: '',
    branch: '',
    year_of_study: '',
    dob: '',
    linkedin_url: '',
    github_url: '',
    otp: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user starts typing
  };

  const nextStep = async () => {
    if (step === 1) {
      if (
        !formData.full_name ||
        !formData.email ||
        !formData.phone ||
        !formData.rollnum ||
        !formData.college ||
        !formData.branch ||
        !formData.year_of_study
      ) {
        toast.error('Please fill in all the fields.');
        return;
      }

      try {
        const getBaseURL = () => {
          const ip = window.location.hostname;
          return `http://${ip === 'localhost' ? 'localhost' : ip}:8000`;
        };

        const response = await axios.post(`${getBaseURL()}/user`, {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          rollnum: formData.rollnum,
          college: formData.college,
          branch: formData.branch,
          year_of_study: formData.year_of_study,
          dob: formData.dob,
          linkedin_url: formData.linkedin_url,
          github_url: formData.github_url,
        });

        if (
          response.data.message ===
          'OTP sent to your email. Please verify OTP to complete registration.'
        ) {
          toast.success('OTP sent to your email!');
          setStep(2);
        } else {
          toast.error('Failed to send OTP. Please try again.');
        }
      } catch (error) {
        console.error(error.response || error.message);
        if (error.response?.status === 400 && error.response?.data?.detail) {
          setError(error.response.data.detail);
          toast.error(error.response.data.detail); // Show toast message for errors
        } else {
          toast.error('Error during registration. Please try again.');
        }
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      if (!formData.otp) {
        toast.error('Please enter the OTP.');
        return;
      }

      try {
        const getBaseURL = () => {
          const ip = window.location.hostname;
          return `http://${ip === 'localhost' ? 'localhost' : ip}:8000`;
        };

        const response = await axios.post(`${getBaseURL()}/verify-otp`, {
          otp: formData.otp,
        });

        if (response.data.message === 'OTP verified successfully.') {
          toast.success('Registration completed successfully!');
          navigate('/login-student');
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.error(error.response || error.message);
        toast.error('Error during OTP verification. Please try again.');
      }
    }
  };

  const renderStep = () => {
    const stepFields = [
      [
        { name: 'full_name', type: 'text', placeholder: 'Full Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'phone', type: 'text', placeholder: 'Phone', required: true },
        { name: 'rollnum', type: 'text', placeholder: 'Roll Number', required: true },
        { name: 'college', type: 'text', placeholder: 'College', required: true },
        { name: 'branch', type: 'text', placeholder: 'Branch', required: true },
        { name: 'year_of_study', type: 'text', placeholder: 'Year of Study', required: true },
        { name: 'dob', type: 'date', placeholder: 'Date of Birth', required: true },
        { name: 'linkedin_url', type: 'url', placeholder: 'LinkedIn Profile URL', required: true },
        { name: 'github_url', type: 'url', placeholder: 'GitHub Profile URL', required: true },
      ],
      [{ name: 'otp', type: 'text', placeholder: 'Enter OTP', required: true }],
    ];

    return (
      <div className="space-y-4">
        {stepFields[step - 1].map((field, index) => (
          <div key={index} className="input-container">
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              required={field.required}
              className="px-4 py-2 border focus:ring-purple-500 focus:border-purple-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h2 className="font-semibold text-xl text-gray-700 mb-2">Student Registration</h2>
            <p className="text-sm text-gray-500 mb-8">
              Register as a student to participate in hackathons.
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              {renderStep()}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md focus:outline-none"
                  >
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>

            <p className="text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login-student" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
