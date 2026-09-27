function generateLoginId(index) {
  return `INT${String(index).padStart(4, "0")}`;
}

module.exports = generateLoginId;