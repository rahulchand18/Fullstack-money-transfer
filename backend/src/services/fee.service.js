exports.calculateFee = (npr) => {
  if (npr <= 100000) return 500;
  if (npr <= 200000) return 1000;
  return 3000;
};
