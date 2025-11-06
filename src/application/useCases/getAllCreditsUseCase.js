module.exports = (creditRepository) => async () => {
  const credits = await creditRepository.getAllCredits();

  if (!credits || credits.length === 0) {
    throw new Error("No credits found");
  }

  return credits;
};