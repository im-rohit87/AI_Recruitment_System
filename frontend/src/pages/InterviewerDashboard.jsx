import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function InterviewerDashboard() {
  const [stats, setStats] = useState({
    resumes: 0,
    questions: 0,
    answers: 0,
    recordings: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );

      console.log("Dashboard Data:", response.data);

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1>Interviewer Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h2>{stats.resumes}</h2>
          <p>Resumes Uploaded</p>
        </div>

        <div className="card">
          <h2>{stats.questions}</h2>
          <p>Questions Generated</p>
        </div>

        <div className="card">
          <h2>{stats.answers}</h2>
          <p>Answers Submitted</p>
        </div>

        <div className="card">
          <h2>{stats.recordings}</h2>
          <p>Interview Recordings</p>
        </div>
      </div>
    </Layout>
  );
}

export default InterviewerDashboard;