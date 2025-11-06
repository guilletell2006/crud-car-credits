module.exports = (dbClient, tableName) => ({
  
  async save(credit) {
    const params = {
      TableName: tableName,
      Item: credit
    };

    await dbClient.put(params).promise();
    return credit;
  },

  
  async findById(id) {
    const params = {
      TableName: tableName,
      Key: { id }
    };

    const result = await dbClient.get(params).promise();
    return result.Item;
  },

  async getAllCredits() {
    const params = { TableName: tableName };
    const result = await dbClient.scan(params).promise();
    return result.Items || [];
  },


  async findByClientId(idClient) {
    const params = {
      TableName: tableName,
      IndexName: "IdClientIndex", 
      KeyConditionExpression: "idClient = :idClient",
      ExpressionAttributeValues: {
        ":idClient": idClient,
      },
    };
    const result = await dbClient.query(params).promise();
    return result.Items || [];
  },


  async updateFields(id, updatedFields) {
    if (!id) throw new Error("Missing ID for update");

    // Construimos dinámicamente el UpdateExpression
    const updateExpParts = [];
    const expAttrValues = {};
    for (const [key, value] of Object.entries(updatedFields)) {
      if (key !== "id") { // nunca actualizamos la clave primaria
        updateExpParts.push(`${key} = :${key}`);
        expAttrValues[`:${key}`] = value;
      }
    }

    const params = {
      TableName: tableName,
      Key: { id },
      UpdateExpression: `SET ${updateExpParts.join(", ")}`,
      ExpressionAttributeValues: expAttrValues,
      ReturnValues: "ALL_NEW"
    };

    const result = await dbClient.update(params).promise();
    return result.Attributes;
  },

  
  async delete(id) {
    if (!id) throw new Error("Missing ID for delete");

    const params = {
      TableName: tableName,
      Key: { id },
    };

    await dbClient.delete(params).promise();
    return { deleted: true };
  },


  
});