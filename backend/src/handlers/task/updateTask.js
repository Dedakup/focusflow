const db = require('../../utils/db');

module.exports.updateTask = async (event) => {
    const { taskId, userId, ...updatedFields } = JSON.parse(event.body);

    if (!taskId || !userId || Object.keys(updatedFields).length === 0) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                error: "Missing required parameters or body",
            }),
        };
    }

    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(updatedFields).forEach((field, index) => {
        const attributeName = `#field${index}`;
        const attributeValue = `:value${index}`;

        updateExpressions.push(`${attributeName} = ${attributeValue}`);
        expressionAttributeNames[attributeName] = field;
        expressionAttributeValues[attributeValue] = updatedFields[field];
    });

    const params = {
        TableName: process.env.DYNAMODB_TASKS_TABLE,
        Key: {
            userId,
            taskId,
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const result = await db.update(params);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                message: "Task updated successfully",
                updatedTask: result.Attributes,
            }),
        };
    } catch (error) {
        console.error("Error updating task:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                error: "Failed to update task",
            }),
        };
    }
};
