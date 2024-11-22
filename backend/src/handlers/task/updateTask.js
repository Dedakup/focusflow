const db = require('../../utils/db');

module.exports.updateTask = async (event) => {
    const { taskId } = event.pathParameters;
    const { title, description, dueDate, status } = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Key: { userId: event.requestContext.authorizer.userId, taskId },
        UpdateExpression: 'set title = :title, description = :description, dueDate = :dueDate, status = :status',
        ExpressionAttributeValues: { ':title': title, ':description': description, ':dueDate': dueDate, ':status': status },
    };

    await db.update(params);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task updated successfully' }),
    };
};
