function extractSkills(text) {
  const skills = [
    "Java",
    "JavaScript",
    "Python",
    "C",
    "HTML",
    "CSS",
    "Git",
    "SQL",
    "MySQL",
    "React"
  ];

  return skills.filter(skill =>
    text.toLowerCase().includes(skill.toLowerCase())
  );
}

module.exports = extractSkills;