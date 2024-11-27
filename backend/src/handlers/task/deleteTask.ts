const db = require("../../utils/db");

module.exports.deleteTask = async (event) => {
    //get task id from url
    const taskId = event.pathParameters?.taskId;

    //validate task id
    if (!taskId) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: "Missing path parameter: taskId" }),
        };
    }

    const userId = event.queryStringParameters?.userId;

    if (!userId) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: "Missing query parameter: userId" }),
        };
    }

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Key: { userId, taskId },
    }

    try {
        await db.delete(params);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ message: "Task deleted successfully", taskId }),
        };
    } catch (error) {
        console.error("DynamoDB Delete Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
