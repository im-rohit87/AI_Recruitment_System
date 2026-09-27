const fs = require("fs");
const pdfParse = require("pdf-parse");
const pool = require("../config/db");

const extractSkills =
  require("../utils/extractSkills");

const generateQuestions =
  require("../utils/generateQuestions");

const calculateScore =
  require("../utils/calculateScore");

exports.uploadResume = async (
  req,
  res
) => {
  try {

    const { userId } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "No resume uploaded",
      });
    }

    // Read PDF

    const dataBuffer =
      fs.readFileSync(
        req.file.path
      );

    // Extract Text

    const pdfData =
      await pdfParse(
        dataBuffer
      );

    const extractedText =
      pdfData.text;

    console.log(
      "EXTRACTED TEXT:"
    );

    console.log(
      extractedText
    );

    // Extract Skills

    const skills =
      extractSkills(
        extractedText
      );

    console.log(
      "Skills:",
      skills
    );

    // Calculate Score

    const score =
      calculateScore(
        skills
      );

    let feedback = "";

    if (score >= 80) {
      feedback =
        "Excellent Candidate";
    }
    else if (score >= 60) {
      feedback =
        "Good Candidate";
    }
    else {
      feedback =
        "Needs Improvement";
    }

    // Save Resume

    const resumeResult =
      await pool.query(
        `
        INSERT INTO resumes
        (
          user_id,
          resume_path,
          extracted_text
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        RETURNING id
        `,
        [
          userId,
          req.file.path,
          extractedText
        ]
      );

    const resumeId =
      resumeResult.rows[0].id;

    // Save Candidate Score

    await pool.query(
      `
      INSERT INTO candidate_scores
      (
        resume_id,
        score,
        feedback
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      `,
      [
        resumeId,
        score,
        feedback
      ]
    );

    // Save Skills

    for (const skill of skills) {

      await pool.query(
        `
        INSERT INTO skills
        (
          resume_id,
          skill_name
        )
        VALUES
        (
          $1,
          $2
        )
        `,
        [
          resumeId,
          skill
        ]
      );

    }

    // Generate Questions

    const questions =
      generateQuestions(
        skills
      );

    console.log(
      "Generated Questions:",
      questions
    );

    // Save Questions

    for (const question of questions) {

      await pool.query(
        `
        INSERT INTO interview_questions
        (
          resume_id,
          question
        )
        VALUES
        (
          $1,
          $2
        )
        `,
        [
          resumeId,
          question
        ]
      );

    }

    res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resumeId,
      score,
      feedback,
      skills,
      questions
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

exports.getResumes = async (
  req,
  res
) => {
  try {

    const result =
      await pool.query(
        `
        SELECT
          resumes.id,
          resumes.resume_path,
          resumes.uploaded_at,
          users.name,
          users.email,

          COALESCE(
            STRING_AGG(
              DISTINCT skills.skill_name,
              ', '
            ),
            ''
          ) AS skills

        FROM resumes

        JOIN users
          ON resumes.user_id =
             users.id

        LEFT JOIN skills
          ON resumes.id =
             skills.resume_id

        GROUP BY
          resumes.id,
          users.name,
          users.email

        ORDER BY
          resumes.id DESC
        `
      );

    res.status(200).json({
      success: true,
      resumes:
        result.rows,
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