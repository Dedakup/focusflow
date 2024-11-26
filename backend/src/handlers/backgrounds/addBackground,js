module.exports.addBackground = async (event) => {
    const userId = event.pathParameters.userId;
    const { id, name, url, thumbnail } = JSON.parse(event.body);

    const params = {
        TableName: 'user-backgrounds',
        Key: { userId },
        UpdateExpression: 'SET backgrounds = list_append(if_not_exists(backgrounds, :emptyList), :newBackground)',
        ExpressionAttributeValues: {
            ':newBackground': [{ id, name, url, thumbnail }],
            ':emptyList': [],
        },
        ReturnValues: 'UPDATED_NEW',
    };

    try {
        const result = await db.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes.backgrounds),
        };
    } catch (error) {
        console.error('Error adding background:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to add background.' }),
        };
    }
};
