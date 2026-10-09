
const swaggerJsdoc = require('swagger-jsdoc');

// Configure Swagger / OpenAPI
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ticket Sales API',
            version: '1.0.0',
            description: 'API documentation for the Ticket Sales project'
        },
        servers: [
            {
                url: 'http://localhost:8000'
            }
        ]
    },
    // Find API documentation comments inside route files
    apis: ['./routes/*.js']
};

// Generate the Swagger specification
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;