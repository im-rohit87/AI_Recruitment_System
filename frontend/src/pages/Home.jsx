import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-10">
        AI INTERVIEW SYSTEM
      </h1>

      <Link
        to="/interviewer-login"
        className="bg-blue-600 text-white px-8 py-3 rounded mb-4"
      >
        Interviewer Login
      </Link>

      <Link
        to="/interviewee-login"
        className="bg-green-600 text-white px-8 py-3 rounded"
      >
        Interviewee Login
      </Link>
    </div>
  );
}

export default Home;