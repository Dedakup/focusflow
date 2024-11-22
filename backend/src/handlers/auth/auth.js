const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.getPublicKey();
        callback(null, signingKey);
    });
}

module.exports.auth0Authorizer = async (event) => {
    const token = event.headers.Authorization || event.headers.authorization;

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Unauthorized" }),
        };
    }

    const bearerToken = token.split(" ")[1];

    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken,
                getKey,
                { audience: process.env.AUTH0_AUDIENCE, issuer: process.env.AUTH0_ISSUER },
                (err, decoded) => (err ? reject(err) : resolve(decoded))
            );
        });

        return {
            principalId: decoded.sub,
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: "Allow",
                        Resource: event.methodArn,
                    },
                ],
            },
        };
    } catch (err) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Unauthorized" }),
        };
    }
};
