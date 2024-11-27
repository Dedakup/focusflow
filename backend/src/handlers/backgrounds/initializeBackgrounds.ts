const AWS = require('aws-sdk');
const db = require('../../utils/db');
const PREDEFINED_BACKGROUNDS = require('./predefinedBackgrounds.json'); // Optional: Use a static JSON

module.exports.initializeBackgrounds = async (event) => {
    const userId = event.pathParameters.userId;

    const params = {
        TableName: 'dev-user-backgrounds',
        Item: {
            userId,
            backgrounds: PREDEFINED_BACKGROUNDS,
        },
        ConditionExpression: 'attribute_not_exists(userId)', // Avoid overwriting if already initialized
    };

    try {
        await db.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'User backgrounds initialized.' }),
        };
    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'User backgrounds already initialized.' }),
            };
        }
        console.error('Error initializing backgrounds:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to initialize backgrounds.' }),
        };
    }
};
