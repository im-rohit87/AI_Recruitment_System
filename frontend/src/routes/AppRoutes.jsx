import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import InterviewerLogin from "../pages/InterviewerLogin";
import IntervieweeLogin from "../pages/IntervieweeLogin";
import InterviewerDashboard from "../pages/InterviewerDashboard";
import IntervieweeDashboard from "../pages/IntervieweeDashboard";
import CandidateManagement from "../pages/CandidateManagement";
import ResumeUpload from "../pages/ResumeUpload";
import ResumeManagement from "../pages/ResumeManagement";
import InterviewQuestions from "../pages/InterviewQuestions";
import ScheduleInterview from "../pages/ScheduleInterview";
import MockInterview from "../pages/MockInterview";
import CandidateRanking
from "../pages/CandidateRanking";


function AppRoutes() {
  return (
    <Routes>

      <Route
      path="/ranking"
      element={<CandidateRanking />}
      />

      <Route
      path="/mock-interview"
      element={<MockInterview />}
      />

      <Route
      path="/schedule-interview"
      element={<h1>ScheduleInterview works</h1>}
      />

      <Route
      path="/interview"
      element={<InterviewQuestions />}
      />
      <Route
      path="/resumes"
      element={<ResumeManagement />}
      />
      <Route path="/" element={<Home />} />

      <Route
        path="/interviewer-login"
        element={<InterviewerLogin />}
      />

      

      <Route
        path="/interviewer-dashboard"
        element={<InterviewerDashboard />}
      />

      

      <Route
        path="/candidates"
        element={<CandidateManagement />}
      />

      <Route
        path="/resume-upload"
        element={<ResumeUpload />}
      />
    </Routes>
  );
}

export default AppRoutes;