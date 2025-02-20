import React from "react";

const LoadingPage = () => {
  return (
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen">
      <div className="text-center">
        {/* Spinning Logo */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-gray-900 rounded-full"></div>
        </div>

        {/* Website Name */}
        <h1 className="text-3xl font-bold mb-2">Hackstad</h1>
        <p className="text-gray-400 text-lg">Loading your ultimate hackathon experience...</p>
      </div>
    </div>
  );
};

export default LoadingPage;