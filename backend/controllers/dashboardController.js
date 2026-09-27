const pool = require("../config/db");

exports.getDashboardStats =
async (req, res) => {

  try {

    const resumeCount =
      await pool.query(
        "SELECT COUNT(*) FROM resumes"
      );

    const questionCount =
      await pool.query(
        "SELECT COUNT(*) FROM interview_questions"
      );

    const answerCount =
      await pool.query(
        "SELECT COUNT(*) FROM interview_answers"
      );

    const recordingCount =
      await pool.query(
        "SELECT COUNT(*) FROM interview_recordings"
      );

    res.json({
  stats: {
    candidates: resumeCount.rows[0].count,
    resumes: resumeCount.rows[0].count,
    interviews: recordingCount.rows[0].count,
  },
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};