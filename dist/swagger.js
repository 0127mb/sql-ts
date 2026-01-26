"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management API',
            version: '1.0.0',
            description: 'API documentation for Library Management System',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Author: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        surname: { type: 'string' },
                        image: { type: 'string' },
                    },
                },
                Category: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        who: { type: 'string' },
                        about: { type: 'string' },
                        image: { type: 'string' },
                    },
                },
                Book: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        discount: { type: 'number' },
                        price_now: { type: 'number' },
                        image: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        email: { type: 'string', format: 'email' },
                        phoneNumber: { type: 'integer' },
                        password: { type: 'string' },
                        image: { type: 'string' },
                    },
                },
            },
        },
        paths: {
            // ================= BOOK =================
            '/books': {
                post: {
                    tags: ['Books'],
                    summary: 'Create book with image',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        discount: { type: 'number' },
                                        price_now: { type: 'number' },
                                        category: { type: 'string' },
                                        author: { type: 'string' },
                                        image: {
                                            type: 'string',
                                            format: 'binary',
                                        },
                                    },
                                    required: ['title', 'discount', 'price_now'],
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Book created' },
                    },
                },
            },
            // ================= AUTHOR =================
            '/authors': {
                post: {
                    tags: ['Authors'],
                    summary: 'Create author with image',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        surname: { type: 'string' },
                                        image: {
                                            type: 'string',
                                            format: 'binary',
                                        },
                                    },
                                    required: ['name', 'surname'],
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Author created' },
                    },
                },
            },
            // ================= CATEGORY =================
            '/category': {
                post: {
                    tags: ['Categories'],
                    summary: 'Create category with image',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        who: { type: 'string' },
                                        about: { type: 'string' },
                                        image: {
                                            type: 'string',
                                            format: 'binary',
                                        },
                                    },
                                    required: ['who'],
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Category created' },
                    },
                },
            },
        },
    },
    apis: ['./src/**/**.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map