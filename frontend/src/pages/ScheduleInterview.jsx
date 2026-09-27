import { useState } from "react";
import axios from "axios";

function ScheduleInterview() {
  const [userId, setUserId] = useState("");
  const [interviewTime, setInterviewTime] = useState("");

  const schedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/interviews/schedule",
        {
          userId,
          interviewTime,
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.error(error);
      alert("Failed");
    }
  };

  return (
    <div>
      <h1>Schedule Interview</h1>

      <input
        placeholder="Candidate ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <br /><br />

      <input
        type="datetime-local"
        value={interviewTime}
        onChange={(e) => setInterviewTime(e.target.value)}
      />

      <br /><br />

      <button onClick={schedule}>
        Schedule
      </button>
    </div>
  );
}

export default ScheduleInterview;