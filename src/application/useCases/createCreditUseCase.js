const { v4: uuidv4 } = require('uuid');

module.exports = (creditRepository) => async (data) => {
  if (!data.clientId || !data.clientName) {
    throw new Error("Missing client data");
  }

  const newCredit = {
    id: uuidv4(),
    clientId: data.clientId,
    clientName: data.clientName,
    phoneNumber: data.phoneNumber,
    vehicle: {
      plate: data.vehicle?.plate,
      brand: data.vehicle?.brand,
      model: data.vehicle?.model
    },
    creditAmount: data.creditAmount,
    installments: data.installments,
    installmentValue: data.installmentValue,
    createdAt: new Date().toISOString()
  };

  return await creditRepository.save(newCredit);

};