module.exports = (creditRepository) => async (idClient) => {
  if (!idClient) {
    throw new Error("Missing clientId");
  }

  const credits = await creditRepository.findByClientId(idClient);

  if (!credits || credits.length === 0) {
    throw new Error(`No credits found for clientId: ${idClient}`);
  }

  return credits;
};
