import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./Home/Loading";
import Home from "./Home/Home";
import SignupSelection from "./Home/SignupSelection";
import CollegeRegister from "./College/Collegeregister";
import CollegeLogin from "./College/Collegelogin";
import CollegeVerify from "./College/Verifyotp";
import Login from "./Home/LoginSelection";
import StudentLogin from "./user/LoginPage";
import ForgotPassword from "./user/ForgotPassword";
import StudentRegister from "./user/UserRegister";
import UserDashboard from "./user/UserDashbaord";
import TeamDashboard from "./team/TeamDashboard";
import TeamHome from "./team/components/TeamHome";
import TeamChat from "./team/components/Teamchat";
import ProblemStatement from "./team/components/ProblemStatement";
import SubmitProject from "./team/components/SubmitProject";
import Leaderboard from "./team/components/LeaderBoard";
import MentorLogin from "./Mentor/MentorLogin";
import MentorDashboard from "./Mentor/MentorDashboard";
import MentorHome from "./Mentor/components/MentorHome";
import MentorHackathons from "./Mentor/components/MentorHackathons";
import Quiz from "./Mentor/components/Quiz";
import Chat from "./Mentor/components/Chat";
import FacultyLogin from "./Faculty/FacultyLogin";
import FacultyDashboard from "./Faculty/FacultyDashboard";
import FacultyHome from "./Faculty/components/FacultyHome";
import AssignedHackathons from "./Faculty/components/AssignedHackathons";
import SchedulePage from "./Faculty/components/SchedulePage";
import CollegeDashboard from "./College/CollegeDashboard";
import CollegeHome from "./College/components/HomeContent";
import StudentsContent from "./College/components/StudentsContent";
import ManagementContent from "./College/components/ManagementContent";
import HackathonsContent from "./College/components/HackathonContent";
import CollegeProfile from "./College/components/CollegeProfile";
import CollegeHackathonDetails from "./College/components/HackathonDetails";
import Profile from "./user/components_/Profile";
import Courses from "./user/components_/Courses";
import RegisteredHackathons from "./user/components_/RegisteredHackathons";
import UpcomingHackathons from "./user/components_/UpcomingHackathons";
import OngoingHackathons from "./user/components_/OngoingHackathons";
import PastHackathons from "./user/components_/PastHackathons";
import Achievement from "./user/components_/Achievements";
import CodeCompiler from "./user/components_/Compiler";
import Dashboard from "./user/components_/Dashboard";
import HackathonDetails from "./user/components_/HackathonDetails";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup-selection" element={<SignupSelection />} />
          <Route path="/college-signup" element={<CollegeRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-student" element={<StudentLogin />} />
          <Route path="/college-login" element={<CollegeLogin />} />
          <Route path="/student-signup" element={<StudentRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/collegeverify-otp" element={<CollegeVerify />} />
          <Route path="/login-mentor" element={<MentorLogin />} />
          <Route path="/login-faculty" element={<FacultyLogin />} />

          {/* Faculty Dashboard */}
          <Route path="/faculty-dashboard" element={<FacultyDashboard />}>
            <Route path="faculty-home" element={<FacultyHome />} />
            <Route path="assigned-hackathons" element={<AssignedHackathons />} />
            <Route path="schedule" element={<SchedulePage />} />
          </Route>

          {/* College Dashboard */}
          <Route path="/college-dashboard" element={<CollegeDashboard />}>
            <Route path="home" element={<CollegeHome />} />
            <Route path="students" element={<StudentsContent />} />
            <Route path="management" element={<ManagementContent />} />
            <Route path="hackathons" element={<HackathonsContent />} />
            <Route path="hackathons/:id" element={<CollegeHackathonDetails />} />
            <Route path="college-profile" element={<CollegeProfile />} />
          </Route>

          {/* User Dashboard */}
          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<Courses />} />
            <Route path="hackathons/registered" element={<RegisteredHackathons />} />
            <Route path="hackathons/upcoming" element={<UpcomingHackathons />} />
            <Route path="hackathons/upcoming/:id" element={<HackathonDetails />} />
            <Route path="hackathons/ongoing" element={<OngoingHackathons />} />
            <Route path="hackathons/past" element={<PastHackathons />} />
            <Route path="compiler" element={<CodeCompiler />} />
            <Route path="achievements" element={<Achievement />} />
          </Route>

          {/* Team Dashboard */}
          <Route path="/team-dashboard" element={<TeamDashboard />}>
            <Route path="team-home" element={<TeamHome />} />
            <Route path="team-chat" element={<TeamChat />} />
            <Route path="problem-statement" element={<ProblemStatement />} />
            <Route path="submit-project" element={<SubmitProject />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>

          {/* Mentor Dashboard */}
          <Route path="/mentor-dashboard" element={<MentorDashboard />} >
            <Route path="mentor-home" element={<MentorHome />} />
            <Route path="mentor-hackathons" element={<MentorHackathons />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
