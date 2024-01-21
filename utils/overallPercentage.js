const calculatePercentage = require("./percentage");

const calculateOverallPercentage = (marks) => {
  const percentages = Object.values(marks)
    .map(calculatePercentage)
    .filter((percent) => percent !== null);

  if (percentages.length === 0) {
    return null; // No valid percentages found
  }

  return (
    percentages.reduce((sum, percentage) => sum + percentage, 0) /
    percentages.length
  );
};

module.exports = calculateOverallPercentage;
