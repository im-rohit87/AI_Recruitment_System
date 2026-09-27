const pool = require("../config/db");

exports.completeInterview =
async (req, res) => {

  try {

    const { interviewId } =
      req.body;

    await pool.query(
      `
      UPDATE interviews
      SET
      completed = true,
      completed_at = NOW()
      WHERE id = $1
      `,
      [interviewId]
    );

    res.json({
      success: true,
      message:
      "Interview completed"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};