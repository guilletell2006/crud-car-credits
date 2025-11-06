exports.success = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data)
});

exports.error = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({ error: message })
});