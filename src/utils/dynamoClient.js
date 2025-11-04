const AWS = require("aws-sdk");

const dynamoConnection = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoConnection;