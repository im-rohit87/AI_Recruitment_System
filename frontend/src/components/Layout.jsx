import { Link } from "react-router-dom";
import {
  FaUsers,
  FaFilePdf,
  FaCalendarAlt,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

function Layout({ children }) {
  return (
    <div className="layout">

      <aside className="sidebar">

        <h2 className="logo">
          AI Interview
        </h2>

        <nav>

          <Link to="/interviewer-dashboard">
            <FaChartBar />
            Dashboard
          </Link>

          <Link to="/candidates">
            <FaUsers />
            Candidates
          </Link>

          <Link to="/resumes">
            <FaFilePdf />
            Resumes
          </Link>

          <Link to="/schedule-interview">
            <FaCalendarAlt />
            Interviews
          </Link>

          <Link to="/">
            <FaSignOutAlt />
            Logout
          </Link>

        </nav>

      </aside>

      <main className="content">
        {children}
      </main>

    </div>
  );
}

export default Layout;