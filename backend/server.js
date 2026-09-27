const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const rankingRoutes = require("./routes/rankingRoutes");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const answerRoutes = require("./routes/answerRoutes");
const interviewScheduleRoutes = require("./routes/interviewScheduleRoutes");
const interviewAnswerRoutes = require("./routes/interviewAnswerRoutes");
const questionRoutes = require("./routes/questionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const interviewVideoRoutes = require("./routes/interviewVideoRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const app = express();   // MUST COME BEFORE ANY app.use()



app.use(
  "/api/evaluation",
  evaluationRoutes
);

app.use(
"/api/evaluation",
evaluationRoutes
);

app.use(
"/api/ranking",
rankingRoutes
);
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/answers", answerRoutes);

app.use("/api/questions", questionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/interview-answers", interviewAnswerRoutes);

app.use("/api/interviews", interviewScheduleRoutes);
app.use("/api/interviews", interviewVideoRoutes);

app.use("/api/interview", interviewRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "AI Interview System API",
      dbTime: result.rows[0].now,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});