const pool = require("../config/db");

exports.scheduleInterview = async (req, res) => {
  try {
    const { userId, interviewTime } = req.body;

    const result = await pool.query(
      `
      INSERT INTO interviews
      (user_id, interview_time)
      VALUES ($1, $2)
      RETURNING *
      `,
      [userId, interviewTime]
    );

    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      interview: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getScheduledInterviews = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        interviews.id,
        interviews.interview_time,
        interviews.status,
        users.name,
        users.email
      FROM interviews
      JOIN users
      ON interviews.user_id = users.id
      ORDER BY interview_time
    `);

    res.json({
      success: true,
      interviews: result.rows,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};