const AWS = require('aws-sdk');
const db = require('../../utils/db');
const PREDEFINED_BACKGROUNDS = require('./predefinedBackgrounds.json');

module.exports.getBackgrounds = async (event) => {
    const userId = event.pathParameters.userId;

    const params = {
        TableName: 'dev-user-backgrounds',
        Key: { userId },
    };

    try {

        const backgrounds = [...PREDEFINED_BACKGROUNDS];

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(backgrounds),
        };
    } catch (error) {
        console.error('Error fetching backgrounds:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to retrieve backgrounds.' }),
        };
    }
};
