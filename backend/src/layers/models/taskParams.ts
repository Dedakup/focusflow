// src/models/taskParams.js
require('dotenv').config();

const createTaskParams = ({ userId, taskId, title, description, dueDate }) => ({
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
});

const getTasksParams = ({ userId }) => ({
    TableName: process.env.DYNAMODB_TASKS_TABLE,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
        ":userId": userId,
    },
});

const updateTaskParams = ({ userId, taskId, updates }) => ({
    TableName: process.env.DYNAMODB_TASKS_TABLE,
    Key: { userId, taskId },
    UpdateExpression: "SET #title = :title, #description = :description, #dueDate = :dueDate, #status = :status",
    ExpressionAttributeNames: {
        "#title": "title",
        "#description": "description",
        "#dueDate": "dueDate",
        "#status": "status",
    },
    ExpressionAttributeValues: {
        ":title": updates.title,
        ":description": updates.description || null,
        ":dueDate": updates.dueDate || null,
        ":status": updates.status || "pending",
    },
    ReturnValues: "UPDATED_NEW",
});

const deleteTaskParams = ({ userId, taskId }) => ({
    TableName: process.env.DYNAMODB_TASKS_TABLE,
    Key: { userId, taskId },
});

module.exports = {
    createTaskParams,
    getTasksParams,
    updateTaskParams,
    deleteTaskParams,
};
