import { useEffect, useState }
from "react";

import axios from "axios";

function CandidateRanking() {

  const [data,setData] =
  useState([]);

  useEffect(() => {

    axios
      .get(
      "http://localhost:5000/api/ranking"
      )
      .then((res) => {
        setData(res.data);
      });

  },[]);

  return (
    <div style={{
      padding:"30px"
    }}>

      <h1>
        Candidate Ranking
      </h1>

      <table
        border="1"
        cellPadding="10"
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Email</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>

        <tbody>

          {data.map(
            (candidate,index) => (

            <tr key={index}>

              <td>
                {index + 1}
              </td>

              <td>
                {candidate.name}
              </td>

              <td>
                {candidate.email}
              </td>

              <td>
                {candidate.score}
              </td>

              <td>
                {candidate.feedback}
              </td>

            </tr>

          ))}

        </tbody>
      </table>

    </div>
  );
}

export default CandidateRanking;