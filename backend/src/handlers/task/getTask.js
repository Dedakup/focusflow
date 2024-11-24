const db = require('../../utils/db');

module.exports.getTasks = async (event) => {
    console.log("Starting getTasks handler");

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
        TableName: process.env.DYNAMODB_TASKS_TABLE, // Ensure the environment variable is correct
        KeyConditionExpression: 'userId = :userId', // Query based on the partition key
        ExpressionAttributeValues: {
            ':userId': userId, // Pass the userId to the query
        },
    };

    console.log("UserId:", userId);
    console.log("DynamoDB params:", params);

    try {
        console.log("Attempting DynamoDB query...");
        const result = await db.query(params);
        console.log("Query result:", result);

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
