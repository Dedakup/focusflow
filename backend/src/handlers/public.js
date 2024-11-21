'use strict';

module.exports.publicEndpoint = (event, context, cb) => {
    cb(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Welcome to our Public API!' }),
    });
};
