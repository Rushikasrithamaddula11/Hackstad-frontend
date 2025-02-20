import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const StatCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
  </div>
);

const Home = () => {
  const stats = {
    totalHackathons: 15,
    studentsCount: 450,
    activeHackathons: 3,
    completedHackathons: 8,
  };

  // Line Chart Data (Hackathon Growth)
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Hackathons Over Time",
        data: [1, 3, 5, 7, 9, 11, 13, 14, 14, 15, 15, 15], // Example data
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };
  
  function MentorHome() {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Hackathons Over Time</h2>
        <div className="h-100">
          <Line 
            data={lineData} 
            options={{
              maintainAspectRatio: false, // Allows height adjustments
              responsive: true,
            }} 
          />
        </div>
      </div>
    );
  }

  // Pie Chart Data (Hackathon Status)
  const pieData = {
    labels: ["Active", "Completed", "Pending"],
    datasets: [
      {
        data: [stats.activeHackathons, stats.completedHackathons, stats.totalHackathons - (stats.activeHackathons + stats.completedHackathons)],
        backgroundColor: ["#a855f7", "#f97316", "#64748b"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Hackathons" value={stats.totalHackathons} color="blue" />
        <StatCard title="Students Mentored" value={stats.studentsCount} color="green" />
        <StatCard title="Active Hackathons" value={stats.activeHackathons} color="purple" />
        <StatCard title="Completed" value={stats.completedHackathons} color="orange" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Hackathon Growth</h2>
          <Line data={lineData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Hackathon Status</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
