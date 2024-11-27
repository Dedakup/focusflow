const AWS = require('aws-sdk');
const db = require('../../utils/db');
const PREDEFINED_MUSIC = require('./predefinedMusic.json');

module.exports.getMusic = async (event) => {
    const userId = event.pathParameters.userId;

    const params = {
        TableName: 'dev-user-music',
        Key: { userId },
    };

    try {

        const music = [...PREDEFINED_MUSIC];

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(music),
        };
    } catch (error) {
        console.error('Error fetching music:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Failed to retrieve music.' }),
        };
    }
};
