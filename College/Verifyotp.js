import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(''); // Define error state

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      const enteredOtp = otp;
      const getBaseURL = () => {
        const ip = window.location.hostname; // Automatically gets the frontend's IP
        return `http://${ip}:8000`;
      };
      try {
        const response = await axios.post(`${getBaseURL()}/college-verify-otp`, { otp: parseInt(enteredOtp) });
      
        // Check if access_token is available in the response data
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          // Assuming the message indicates successful registration or login
          navigate('/college-login');
        } else {
          setError('OTP verification failed. Please try again.');
        }
      } catch (err) {
        console.error('Error during OTP verification:', err);
        // Handle error if the response does not contain a detail message
        setError(err.response?.data?.detail || 'OTP verification failed. Please try again.');
      }
      
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Verify OTP
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter 6-digit OTP"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error if any */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white rounded-md px-4 py-2 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
