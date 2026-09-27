const express = require("express");
const router = express.Router();

const {
  getQuestions,
} = require("../controllers/questionController");

console.log("getQuestions =", getQuestions);
router.get(
  "/:resumeId",
  getQuestions
);

module.exports = router;