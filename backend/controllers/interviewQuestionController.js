const pool =
require("../config/db");

exports.getQuestions =
async (req, res) => {
  try {
    const { resumeId } =
      req.params;

    const result =
      await pool.query(
        `
        SELECT *
        FROM interview_questions
        WHERE resume_id=$1
        `,
        [resumeId]
      );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};