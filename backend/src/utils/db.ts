const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = {
    put: (params) => dynamoDb.put(params).promise(),
    get: (params) => dynamoDb.get(params).promise(),
    query: (params) => dynamoDb.query(params).promise(),
    update: (params) => dynamoDb.update(params).promise(),
    delete: (params) => dynamoDb.delete(params).promise(),
};
