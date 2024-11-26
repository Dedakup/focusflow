module.exports.deleteBackground = async (event) => {
    const userId = event.pathParameters.userId;
    const { id } = JSON.parse(event.body);

    const getParams = {
        TableName: 'user-backgrounds',
        Key: { userId },
    };

    try {
        const result = await db.get(getParams).promise();
        const currentBackgrounds = result.Item?.backgrounds || [];

        const updatedBackgrounds = currentBackgrounds.filter((bg) => bg.id !== id);

        const updateParams = {
            TableName: 'user-backgrounds',
            Key: { userId },
            UpdateExpression: 'SET backgrounds = :updatedBackgrounds',
            ExpressionAttributeValues: {
                ':updatedBackgrounds': updatedBackgrounds,
            },
        };

        await db.update(updateParams).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(updatedBackgrounds),
        };
    } catch (error) {
        console.error('Error deleting background:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to delete background.' }),
        };
    }
};
