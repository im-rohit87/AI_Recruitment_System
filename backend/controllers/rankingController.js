const pool =
require("../config/db");

exports.getRanking =
async (req,res) => {

  try {

    const result =
      await pool.query(
        `
        SELECT
          users.name,
          users.email,
          candidate_scores.score,
          candidate_scores.feedback
        FROM candidate_scores

        JOIN resumes
          ON candidate_scores.resume_id =
             resumes.id

        JOIN users
          ON resumes.user_id =
             users.id

        ORDER BY score DESC
        `
      );

    res.json(
      result.rows
    );

  } catch(error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};