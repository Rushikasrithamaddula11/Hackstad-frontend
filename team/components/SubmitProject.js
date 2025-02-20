import React from 'react';

export default function SubmitProject() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Submit Your Project</h2>
      <form className="space-y-6">
        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">Team Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your team name"
          />
        </div>

        {/* Problem Statement ID */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">Problem Statement ID</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter PS ID (e.g., PS 01)"
          />
        </div>

        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">Project Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter project title"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">Project Description</label>
          <textarea
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Describe your project"
          ></textarea>
        </div>

        {/* GitHub Repository URL */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">GitHub Repository URL</label>
          <input
            type="url"
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://github.com/username/repository"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
}
