module.exports = (creditRepository) => async (id, updatedData) => {
  if (!id) {
    throw new Error("Missing credit ID");
  }

  const existingCredit = await creditRepository.findById(id);
  if (!existingCredit) {
    throw new Error(`Credit not found with ID: ${id}`);
  }

  const updatedFields = { ...updatedData };
  updatedFields.updatedAt = new Date().toISOString();

  const updatedCredit = await creditRepository.updateFields(id, updatedFields);

  return { ...existingCredit, ...updatedFields };
};
