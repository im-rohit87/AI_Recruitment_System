function calculateInterviewScore(answers) {
  let score = 0;

  answers.forEach((answer) => {
    if (answer.answer.length > 50) {
      score += 20;
    } else if (answer.answer.length > 20) {
      score += 10;
    }
  });

  if (score > 100) {
    score = 100;
  }

  return score;
}

module.exports = calculateInterviewScore;