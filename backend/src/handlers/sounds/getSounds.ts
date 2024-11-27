const AWS = require('aws-sdk');
const db = require('../../utils/db');
const PREDEFINED_SOUNDS = require('./predefinedSounds.json');

module.exports.getSounds = async (event) => {
    const userId = event.pathParameters.userId;

    const params = {
        TableName: 'dev-user-sounds',
        Key: { userId },
    };

    try {

        const sounds = [...PREDEFINED_SOUNDS];

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(sounds),
        };
    } catch (error) {
        console.error('Error fetching sounds:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to retrieve sounds.' }),
        };
    }
};
