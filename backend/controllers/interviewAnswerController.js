const pool = require("../config/db");

exports.saveAnswer = async (req, res) => {
  try {
    const {
      userId,
      question,
      answer,
    } = req.body;

    await pool.query(
      `
      INSERT INTO interview_answers
      (user_id, question, answer)
      VALUES ($1, $2, $3)
      `,
      [userId, question, answer]
    );

    res.status(200).json({
      success: true,
      message: "Answer saved successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};