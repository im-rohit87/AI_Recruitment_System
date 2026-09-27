function generateQuestions(skills) {
  console.log(
    "generateQuestions received:",
    skills
  );

  const questions = [];

  if (skills.includes("React")) {
    questions.push(
      "What are React Hooks?"
    );

    questions.push(
      "Explain useEffect."
    );
  }

  if (skills.includes("JavaScript")) {
    questions.push(
      "What is closure in JavaScript?"
    );

    questions.push(
      "Difference between var, let and const?"
    );
  }

  if (skills.includes("Python")) {
    questions.push(
      "What are Python decorators?"
    );

    questions.push(
      "Explain list comprehension."
    );
  }

  if (skills.includes("SQL")) {
    questions.push(
      "What is a JOIN?"
    );

    questions.push(
      "Difference between DELETE and TRUNCATE?"
    );
  }

  console.log(
    "Generated questions:",
    questions
  );

  return questions;
}

module.exports =
  generateQuestions;