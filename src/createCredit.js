const { v4: uuidv4 } = require("uuid");


const dynamoConnection = require("./utils/dynamoClient");
const TABLE_NAME = process.env.DYNAMODB_TABLE;
const STAGE = process.env.STAGE || 'dev';

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const newCredit = {
      id: uuidv4(),
      clientId: data.clientId,
      clientName: data.clientName,
      phoneNumber: data.phoneNumber,
      vehicle: {
        plate: data.vehicle.plate,
        brand: data.vehicle.brand,
        model: data.vehicle.model
      },
      creditAmount: data.creditAmount,
      installments: data.installments,
      installmentValue: data.installmentValue,
      createdAt: new Date().toISOString()
    };

    await dynamoConnection.put({
      TableName: TABLE_NAME,
      Item: newCredit
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: `✅ Credit successfully created in ${STAGE} 🚗💰`,
        credit: newCredit
      })
    };

  } catch (error) {
    console.error("❌ Error creating credit:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message })
    };
  }
};
