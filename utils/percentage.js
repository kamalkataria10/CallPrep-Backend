const calculatePercentage = (marks) => {
  if (!marks || marks.length !== 2 || marks[1] === 0) {
    return null; // Invalid marks format or total_marks is zero
  }
  return (marks[0] / marks[1]) * 100;
};

module.exports = calculatePercentage;
