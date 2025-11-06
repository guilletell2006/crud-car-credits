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
  }

  
});