const db = require('../../utils/db');

module.exports.updateBackground = async (event) => {
    const userId = event.requestContext.authorizer.userId;
    const { background } = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_USERS_TABLE,
        Key: { userId },
        UpdateExpression: 'set background = :background',
        ExpressionAttributeValues: { ':background': background },
    };

    await db.update(params);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Background updated successfully' }),
    };
};
