function evaluateAnswer(answer) {

  let score = 0;

  if (answer.length > 50) {
    score += 20;
  }

  if (
    answer.toLowerCase().includes("example")
  ) {
    score += 20;
  }

  if (
    answer.split(" ").length > 30
  ) {
    score += 20;
  }

  return score;
}

module.exports =
  evaluateAnswer;