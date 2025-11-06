const dynamoClient = require('../../infrastructure/database/dynamoClient');
const creditRepositoryFactory = require('../../domain/repositories/creditRepository');
const createCreditUseCaseFactory = require('../../application/useCases/createCreditUseCase');
const response = require('../../utils/responseBuilder');

const tableName = process.env.DYNAMODB_TABLE;

const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const createCredit = createCreditUseCaseFactory(creditRepository);

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const result = await createCredit(data);
    return response.success(201, result);
  } catch (error) {
    console.error("Error creating credit:", error);
    return response.error(500, error.message);
  }
  
};
