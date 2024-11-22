const db = require('../../utils/db');

module.exports.createTask = async (event) => {
    const { userId, taskId, title, description, dueDate } = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Item: { userId, taskId, title, description, dueDate, status: 'pending' },
    };

    await db.put(params);

    return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Task created successfully', taskId }),
    };
};
