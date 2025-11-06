module.exports = (creditRepository) => async (id) => {
  if (!id) {
    throw new Error("Missing credit ID");
  }

  const existingCredit = await creditRepository.findById(id);
  if (!existingCredit) {
    throw new Error(`Credit not found with ID: ${id}`);
  }

  await creditRepository.delete(id);
  return { message: `Credit with ID ${id} deleted successfully.` };
};
