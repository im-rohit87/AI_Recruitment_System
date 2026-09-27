const fs = require("fs");
const csv = require("csv-parser");
const pool = require("../config/db");

// Upload CSV and import candidates
exports.uploadCandidates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV file uploaded",
      });
    }

    const candidates = [];

    fs.createReadStream(req.file.path)
      .pipe(
        csv({
          headers: ["name", "email", "phone"],
        })
      )
      .on("data", (row) => {
        candidates.push(row);
      })
      .on("end", async () => {
        try {
          let imported = 0;

          for (const candidate of candidates) {
            // Skip invalid rows
            if (
              !candidate.name ||
              !candidate.email ||
              candidate.email === "email"
            ) {
              continue;
            }

            const loginId =
              candidate.email.split("@")[0];

            await pool.query(
              `
              INSERT INTO users
              (name, email, login_id, password, role)
              VALUES ($1, $2, $3, $4, $5)
              ON CONFLICT (email) DO NOTHING
              `,
              [
                candidate.name.trim(),
                candidate.email.trim(),
                loginId,
                "123456",
                "candidate",
              ]
            );

            imported++;
          }

          res.status(200).json({
            success: true,
            message: `${imported} candidates imported`,
          });

        } catch (err) {
          console.error(err);

          res.status(500).json({
            success: false,
            message: err.message,
          });
        }
      });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM users
      WHERE role = 'candidate'
      ORDER BY id
      `
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      candidates: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Shortlist candidate
exports.shortlistCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE users
      SET shortlisted = true
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate shortlisted",
      candidate: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};