const dynamoClient = require('../../infrastructure/database/dynamoClient');
const response = require('../../utils/responseBuilder');
const creditRepositoryFactory = require('../../domain/repositories/creditRepository');
const getAllCreditsUseCaseFactory = require('../../application/useCases/getAllCreditsUseCase');

const tableName = process.env.DYNAMODB_TABLE;

const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const getAllCredits = getAllCreditsUseCaseFactory(creditRepository);


exports.handler = async () => {
  try {
    const credits = await getAllCredits();
    return response.success(200, credits);
  } catch (error) {
    console.error("Error retrieving all credits:", error);
    const statusCode = error.message.includes("not found") ? 404 : 400;
    return response.error(statusCode, error.message);
  }
  
};
