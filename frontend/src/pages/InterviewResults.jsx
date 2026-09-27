import { useState } from "react";
import axios from "axios";

function InterviewResults() {

  const [result,setResult] =
    useState(null);

  const loadResult =
    async () => {

      const res =
        await axios.post(
          "http://localhost:5000/api/evaluation/evaluate",
          {
            userId:1
          }
        );

      setResult(res.data);
    };

  return (
    <div style={{
      padding:"30px"
    }}>

      <h1>
        Interview Results
      </h1>

      <button
        onClick={loadResult}
      >
        Generate Result
      </button>

      {result && (

        <div>

          <h2>
            Technical:
            {result.technical}
          </h2>

          <h2>
            Communication:
            {result.communication}
          </h2>

          <h2>
            Overall:
            {result.overall}
          </h2>

          <h2>
            {result.feedback}
          </h2>

        </div>

      )}

    </div>
  );
}

export default InterviewResults;