const pool = require("../config/db");

exports.uploadVideo = async (
  req,
  res
) => {
  try {
    console.log("VIDEO ROUTE HIT");

    const { userId } = req.body;

    await pool.query(
      `
      INSERT INTO interview_recordings
      (
        user_id,
        video_path
      )
      VALUES ($1,$2)
      `,
      [
        userId,
        req.file.path,
      ]
    );

    res.json({
      success: true,
      message:
        "Interview recording uploaded",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};