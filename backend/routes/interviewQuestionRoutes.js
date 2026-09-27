const express =
require("express");

const router =
express.Router();

const {
  getQuestions
} = require(
"../controllers/interviewQuestionController"
);

router.get(
"/:resumeId",
getQuestions
);

module.exports = router;