import React, { useState } from 'react';

export default function ProblemStatement() {
  // List of available problem statements
  const problems = [
    {
      id: 1,
      title: "Build an AI-powered Chatbot",
      description: "Create a chatbot to assist students with mental health concerns using AI/ML for sentiment analysis."
    },
    {
      id: 2,
      title: "Smart Waste Management System",
      description: "Develop an IoT-based system to track waste collection and optimize routes for environmental sustainability."
    },
    {
      id: 3,
      title: "Blockchain-Based Voting System",
      description: "Design a secure voting system using blockchain technology to prevent fraud and ensure transparency."
    }
  ];

  // State to track the selected problem
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Handle problem selection
  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setSubmitted(false);
  };

  // Handle submission
  const handleSubmit = () => {
    if (selectedProblem) {
      setSubmitted(true);
      alert(`You have selected: ${selectedProblem.title}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-black space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">Select a Problem Statement</h2>

      {/* Problem Statement Cards */}
      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedProblem?.id === problem.id
                ? "border-blue-500 bg-blue-100"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleSelectProblem(problem)}
          >
            <h3 className="text-xl font-semibold">{problem.title}</h3>
            <p className="text-gray-700">{problem.description}</p>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedProblem}
        className={`w-full py-2 rounded-lg text-white text-lg font-semibold transition ${
          selectedProblem
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>

      {/* Confirmation Message */}
      {submitted && selectedProblem && (
        <p className="text-green-600 mt-2">✅ You have selected: {selectedProblem.title}</p>
      )}
    </div>
  );
}
