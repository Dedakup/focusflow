const db = require('../../utils/db');

module.exports.createTask = async (event) => {
    // Log the received body
    console.log("Received event body:", event.body);

    let taskData;
    try {
        taskData = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ error: "Invalid JSON body" }),
        };
    }

    const { userId, taskId, title, description, dueDate } = taskData;

    // Validate required fields
    if (!userId || !taskId || !title) {
        console.error("Missing required fields:", { userId, taskId, title });
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                error: "Missing required fields: userId, taskId, title",
                details: { userId, taskId, title },
            }),
        };
    }

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Item: {
            userId,
            taskId,
            title,
            description: description || null,
            dueDate: dueDate || null,
            status: "pending",
            createdAt: new Date().toISOString(),
        },
    };

    try {
        const result = await db.put(params);
        console.log("DynamoDB PUT Success:", result);
        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Task created successfully', taskId }),
        };
    } catch (error) {
        console.error("DynamoDB PUT Error:", error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: error.message }),
        };
    }    
};
