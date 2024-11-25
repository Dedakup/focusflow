const db = require('../../utils/db');

module.exports.getTasks = async (event) => {

    // Get userId from query string parameters
    const userId = event.queryStringParameters?.userId;

    if (!userId) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Missing userId in query parameters' }),
        };
    }

    // DynamoDB query parameters
    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": userId,
        },
    }

    //query data
    try {
        const result = await db.query(params);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(result.Items), // Return the fetched items
        };
    } catch (error) {
        console.error("Database query failed:", error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
