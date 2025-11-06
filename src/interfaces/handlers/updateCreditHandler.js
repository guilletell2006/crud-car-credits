const dynamoClient = require('../../infrastructure/database/dynamoClient');
const response = require('../../utils/responseBuilder');
const creditRepositoryFactory = require('../../domain/repositories/creditRepository');
const updateCreditUseCaseFactory = require('../../application/useCases/updateCreditUseCase');

const tableName = process.env.DYNAMODB_TABLE;
const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const updateCredit = updateCreditUseCaseFactory(creditRepository);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { id, ...updateData } = body;

    if (!id) {
      return response.error(400, "Missing credit ID");
    }

    const updatedCredit = await updateCredit(id, updateData);
    return response.success(200, updatedCredit);
  } catch (error) {
    console.error("Error updating credit:", error);
    return response.error(400, error.message);
  }
};
