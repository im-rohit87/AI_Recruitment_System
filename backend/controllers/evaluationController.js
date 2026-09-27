// const pool = require("../config/db");

const calculateInterviewScore =
  require("../utils/calculateInterviewScore");

exports.evaluateInterview =
  async (req, res) => {
    try {
      const { userId } = req.body;

      const answersResult =
        await pool.query(
          `
          SELECT *
          FROM interview_answers
          WHERE user_id = $1
          `,
          [userId]
        );

      const answers =
        answersResult.rows;

      const score =
        calculateInterviewScore(
          answers
        );

      let feedback = "";

      if (score >= 80) {
        feedback =
          "Excellent Interview";
      } else if (score >= 60) {
        feedback =
          "Good Performance";
      } else {
        feedback =
          "Needs Improvement";
      }

      await pool.query(
        `
        INSERT INTO interview_results
        (
          user_id,
          score,
          feedback
        )
        VALUES ($1,$2,$3)
        `,
        [
          userId,
          score,
          feedback,
        ]
      );

      res.json({
        success: true,
        score,
        feedback,
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };