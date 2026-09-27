const express = require("express");
const router = express.Router();

const {
  submitAnswer
} = require(
  "../controllers/answerController"
);

router.post(
  "/submit",
  submitAnswer
);

module.exports = router;