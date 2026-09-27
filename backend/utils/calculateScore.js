function calculateScore(skills) {
  let score = 0;

  const preferredSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "Python",
    "Java"
  ];

  skills.forEach(skill => {
    if (preferredSkills.includes(skill)) {
      score += 15;
    }
  });

  if (score > 100) {
    score = 100;
  }

  return score;
}

module.exports = calculateScore;