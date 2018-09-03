// Sherlock's method for finding the number of months between 2 dates.
// Used for making assumptions about what a user means when year is ambiguous
export const monthDiff = (d1, d2) => {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth() + 1;
  return months <= 0 ? 0 : months;
};
