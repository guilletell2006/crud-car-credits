const dynamoClient = require('../../infrastructure/database/dynamoClient');
const response = require('../../utils/responseBuilder');
const creditRepositoryFactory = require('../../domain/repositories/creditRepository');
const deleteCreditUseCaseFactory = require('../../application/useCases/deleteCreditUseCase');

const tableName = process.env.DYNAMODB_TABLE;

const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const deleteCredit = deleteCreditUseCaseFactory(creditRepository);

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters || {};

    if (!id) {
      return response.error(400, "Missing credit ID in path parameters");
    }

    const result = await deleteCredit(id);
    return response.success(200, result);
  } catch (error) {
    console.error("Error deleting credit:", error);
    return response.error(400, error.message);
  }
};
