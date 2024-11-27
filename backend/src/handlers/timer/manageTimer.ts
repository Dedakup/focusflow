module.exports.manageTimer = async (event) => {
    const { action, duration } = JSON.parse(event.body);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Timer ${action} for ${duration} minutes` }),
    };
};
