const express =
  require("express");

const router =
  express.Router();

const {
  completeInterview,
} = require(
  "../controllers/interviewController"
);

router.post(
  "/complete",
  completeInterview
);

module.exports =
  router;