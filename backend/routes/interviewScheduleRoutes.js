const express = require("express");
const router = express.Router();

const {
  scheduleInterview,
  getScheduledInterviews,
} = require(
  "../controllers/interviewScheduleController"
);

router.post(
  "/schedule",
  scheduleInterview
);

router.get(
  "/all",
  getScheduledInterviews
);

module.exports = router;