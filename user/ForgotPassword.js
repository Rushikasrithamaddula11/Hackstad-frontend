import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Password reset link sent to your email!')
    // Add your password reset logic here
  }

  return (
    <>
    <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500">
        <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Reset Your Password</h2>
            <p className="text-sm text-gray-500">Enter your email address and we’ll send you a link to reset your password.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send reset link
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 px-5 rounded-lg text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
