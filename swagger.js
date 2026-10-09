
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ticket Sales API',
            version: '1.0.0',
            description: 'API documentation for Ticket Sales'
        },
        servers: [
            {
                url: 'http://localhost:8000'
            }
        ],

        // Semua endpoint membutuhkan JWT secara default
        security: [
            {
                bearerAuth: []
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Masukkan JWT token hasil login'
                }
            }
        }
    },

    // Membaca komentar Swagger dari file routes
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;