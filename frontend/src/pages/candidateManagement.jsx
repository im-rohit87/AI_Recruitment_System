import { useState, useEffect } from "react";
import axios from "axios";

function CandidateManagement() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [candidates, setCandidates] = useState([]);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/candidates"
      );

      setCandidates(response.data.candidates);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // File selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Upload CSV
  const uploadCSV = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/candidates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      // Refresh table after upload
      fetchCandidates();

    } catch (error) {
      console.error("Upload Error:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Upload Failed"
      );
    }
  };

  // Shortlist candidate
  const shortlistCandidate = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/candidates/shortlist/${id}`
      );

      fetchCandidates();

    } catch (error) {
      console.error("Shortlist Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Candidate Management</h1>

      <h3>Upload Interviewees CSV</h3>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />

      <br />
      <br />

      <button onClick={uploadCSV}>
        Upload CSV
      </button>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}

      <hr />

      <h2>Candidate List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Status</th>
            <th>Action</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Login ID</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                {candidate.shortlisted
                  ? "Shortlisted"
                  : "Pending"}
              </td>

              <td>
                {!candidate.shortlisted && (
                  <button
                    onClick={() =>
                      shortlistCandidate(candidate.id)
                    }
                  >
                    Shortlist
                  </button>
                )}
              </td>

              <td>{candidate.id}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.login_id}</td>
              <td>{candidate.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateManagement;