import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const getBaseURL = () => {
    const ip = window.location.hostname; // Automatically gets the frontend's IP
    return `http://${ip}:8000`;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${getBaseURL()}/userlogin`, { email });
      toast.success('OTP sent to your email!');
      setStep('otp'); // Move to OTP verification step
    } catch (error) {
      console.error('Error Sending OTP:', error);
      toast.error('Failed to Send OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${getBaseURL()}/verify-user`, { otp: parseInt(otp) });
      const token = response.data.access_token;
      console.log('Token received:', token); // Debugging
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      navigate('/user-dashboard'); // Redirect to user dashboard
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 font-medium"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors duration-200"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                OTP sent to {email}
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="ml-2 text-purple-500 hover:text-purple-600"
                >
                  Change email
                </button>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 font-medium"
            >
              Verify & Sign In
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="/signup" className="text-purple-500 hover:text-purple-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
