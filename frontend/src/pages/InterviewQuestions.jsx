import { useState } from "react";
import axios from "axios";

function InterviewQuestions() {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");

  const question = "What is React Hook?";

  const submitAnswer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/answers/submit",
        {
          userId: 1,
          question,
          answer,
        }
      );

      setScore(response.data.score);
      setFeedback(response.data.feedback);

    } catch (error) {
      console.error(error);
      alert("Failed to submit answer");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Interview Question</h1>

      <h3>{question}</h3>

      <textarea
        rows="8"
        cols="80"
        value={answer}
        onChange={(e) =>
          setAnswer(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submitAnswer}>
        Submit Answer
      </button>

      {score !== null && (
        <div style={{ marginTop: "20px" }}>
          <h3>Score: {score}/10</h3>
          <p>
            <strong>Feedback:</strong>{" "}
            {feedback}
          </p>
        </div>
      )}
    </div>
  );
}

export default InterviewQuestions;