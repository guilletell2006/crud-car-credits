const dynamoClient = require('../../infrastructure/database/dynamoClient');
const creditRepositoryFactory = require('../../domain/repositories/creditRepository');
const response = require('../../utils/responseBuilder');
const getCreditByIdUseCaseFactory = require('../../application/useCases/getCreditByIdUseCase');

const tableName = process.env.DYNAMODB_TABLE;

const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const getCreditById = getCreditByIdUseCaseFactory(creditRepository);


exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const result = await getCreditById(id);
    return response.success(200, result);
  } catch (error) {
    console.error("Error retrieving credit:", error);
    const statusCode = error.message.includes("not found") ? 404 : 400;
    return response.error(statusCode, error.message);
  }
  
};
