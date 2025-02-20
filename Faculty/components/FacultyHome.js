import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const FacultyHome = () => {
  const numberOfHackathons = 15;
  const numberOfStudentsGuided = 120;

  // Bar Chart Data
  const barData = {
    labels: ["Hackathons", "Students Guided"],
    datasets: [
      {
        label: "Count",
        data: [numberOfHackathons, numberOfStudentsGuided],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderRadius: 6,
      },
    ],
  };

  // Donut Chart Data
  const donutData = {
    labels: ["Beginner Level", "Intermediate", "Advanced"],
    datasets: [
      {
        data: [50, 40, 30], // Example data distribution
        backgroundColor: ["#f87171", "#facc15", "#22c55e"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Faculty Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Hackathons Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-700">Hackathons</h2>
          <p className="text-3xl font-bold text-blue-600">{numberOfHackathons}</p>
          <p className="text-sm text-gray-500">Total Hackathons Assigned</p>
        </div>

        {/* Students Guided Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-700">Students Guided</h2>
          <p className="text-3xl font-bold text-green-600">{numberOfStudentsGuided}</p>
          <p className="text-sm text-gray-500">Total Students You Have Guided</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  {/* Bar Chart */}
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Statistics Overview</h2>
    <div className="h-96"> {/* Increased height */}
      <Bar 
        data={barData} 
        options={{
          maintainAspectRatio: false, // Allows the height to be adjusted
          responsive: true,
        }} 
      />
    </div>
  </div>



        {/* Donut Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Student Distribution</h2>
          <Doughnut data={donutData} />
        </div>
      </div>
    </div>
  );
};

export default FacultyHome;
