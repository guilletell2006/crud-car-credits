const dynamoClient = require("../../infrastructure/database/dynamoClient");
const response = require("../../utils/responseBuilder");
const creditRepositoryFactory = require("../../domain/repositories/creditRepository");
const getCreditsByClientIdUseCaseFactory = require("../../application/useCases/getCreditsByClientIdUseCase");

const tableName = process.env.DYNAMODB_TABLE;

const creditRepository = creditRepositoryFactory(dynamoClient, tableName);
const getCreditsByClientId = getCreditsByClientIdUseCaseFactory(creditRepository);

exports.handler = async (event) => {
  try {
    const idClient = event.pathParameters?.idClient;

    const credits = await getCreditsByClientId(idClient);
    return response.success(200, credits);
  } catch (error) {
    console.error("Error retrieving credits by clientId:", error);
    const statusCode = error.message.includes("not found") ? 404 : 400;
    return response.error(statusCode, error.message);
  }
};
