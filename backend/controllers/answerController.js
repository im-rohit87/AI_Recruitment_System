const pool = require("../config/db");

exports.submitAnswer = async (req, res) => {
  try {
    const {
      userId,
      question,
      answer,
    } = req.body;

    await pool.query(
      `
      INSERT INTO answers
      (user_id, question, answer)
      VALUES ($1, $2, $3)
      `,
      [userId, question, answer]
    );

    res.json({
      success: true,
      score: 5,
      feedback: "Answer submitted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};