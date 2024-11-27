import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import express from 'express';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Example route
app.get('/login', (req, res) => {
    res.send('Login endpoint');
});

export default app;
