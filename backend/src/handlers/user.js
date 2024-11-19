exports.getUser = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User retrieved successfully",
        }),
    };
};

exports.updateUser = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "User updated successfully",
        }),
    };
};  