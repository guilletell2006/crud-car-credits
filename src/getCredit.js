const dynamoConnection = require("./utils/dynamoClient");
const TABLE_NAME = process.env.DYNAMODB_TABLE;


exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing credit ID" }),
      };
    }

    const result = await dynamoConnection
      .get({
        TableName: TABLE_NAME,
        Key: { id },
      })
      .promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Credit not found for ID: ${id}` }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error("Error retrieving credit:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving credit",
        error: error.message,
      }),
    };
  }
};