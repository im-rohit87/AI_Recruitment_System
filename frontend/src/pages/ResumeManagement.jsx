import { useEffect, useState } from "react";
import axios from "axios";

function ResumeManagement() {
  const [resumes, setResumes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchResumes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/resumes"
      );

      setResumes(response.data.resumes);

    } catch (error) {
      console.error(error);
    }
  };

  const loadQuestions = async (
    resumeId
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/questions/${resumeId}`
      );

      setQuestions(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Management</h1>

      <h2>
        Generated Interview Questions
      </h2>

      {questions.length > 0 ? (
        <ul>
          {questions.map((q) => (
            <li key={q.id}>
              {q.question}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Select a resume to view
          interview questions
        </p>
      )}

      <hr />

      <div className="resume-grid">

  {resumes.map((resume) => (

    <div
      key={resume.id}
      className="resume-card"
    >

      <h3>{resume.name}</h3>

      <p>{resume.email}</p>

      <p>
        <strong>Skills:</strong>
        {resume.skills}
      </p>

      <a
        href={`http://localhost:5000/${resume.resume_path}`}
        target="_blank"
        rel="noreferrer"
      >
        View Resume
      </a>

    </div>

  ))}

</div>
    </div>
  );
}

export default ResumeManagement;