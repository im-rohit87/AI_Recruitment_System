const express = require("express");
const router = express.Router();

const {
  saveAnswer,
} = require(
  "../controllers/interviewAnswerController"
);

router.post(
  "/save",
  saveAnswer
);

module.exports = router;