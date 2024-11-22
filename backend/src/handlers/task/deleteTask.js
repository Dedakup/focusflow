const db = require('../../utils/db');

module.exports.deleteTask = async (event) => {
    const { taskId } = event.pathParameters;

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Key: { userId: event.requestContext.authorizer.userId, taskId },
    };

    await db.delete(params);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Task deleted successfully' }),
    };
};
