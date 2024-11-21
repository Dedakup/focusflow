'use strict';

module.exports.privateEndpoint = (event, context, cb) => {
    cb(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'Only logged-in users can see this.' }),
    });
};
