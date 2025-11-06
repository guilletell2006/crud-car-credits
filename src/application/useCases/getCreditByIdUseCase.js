module.exports = (creditRepository) => async (id) => {
  if (!id) {
    throw new Error("Missing credit ID");
  }

  const credit = await creditRepository.findById(id);

  if (!credit) {
    throw new Error(`Credit not found for ID: ${id}`);
  }

  return credit;
};
