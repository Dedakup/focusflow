const db = require('../../utils/db');

module.exports.getTasks = async (event) => {
    const userId = event.queryStringParameters.userId;

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userId },
    };

    const result = await db.query(params);

    return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
    };
};
