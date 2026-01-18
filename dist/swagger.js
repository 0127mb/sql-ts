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
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
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
                        id: {
                            type: 'integer',
                            description: 'Author ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Author first name',
                        },
                        surname: {
                            type: 'string',
                            description: 'Author last name',
                        },
                    },
                    required: ['name', 'surname'],
                },
                Book: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Book ID',
                        },
                        title: {
                            type: 'string',
                            description: 'Book title',
                        },
                        discount: {
                            type: 'number',
                            description: 'Discount percentage',
                        },
                        price_now: {
                            type: 'number',
                            description: 'Current price',
                        },
                        category: {
                            type: 'string',
                            description: 'Book category',
                        },
                        about: {
                            type: 'string',
                            description: 'Book description',
                        },
                        author: {
                            $ref: '#/components/schemas/Author',
                        },
                    },
                    required: ['title', 'discount', 'price_now', 'category', 'about'],
                },
                Course: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Course ID',
                        },
                        title: {
                            type: 'string',
                            description: 'Course title',
                        },
                        full_name: {
                            type: 'string',
                            description: 'Instructor full name',
                        },
                        discount: {
                            type: 'number',
                            description: 'Discount percentage',
                        },
                        price_now: {
                            type: 'number',
                            description: 'Current price',
                        },
                        category: {
                            type: 'string',
                            description: 'Course category',
                        },
                        about: {
                            type: 'string',
                            description: 'Course description',
                        },
                        way: {
                            type: 'string',
                            description: 'Course path/level',
                        },
                    },
                    required: ['title', 'full_name', 'discount', 'price_now', 'category', 'about', 'way'],
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                        error: {
                            type: 'object',
                            description: 'Error details',
                        },
                    },
                },
                Category: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Category ID',
                        },
                        who: {
                            type: 'string',
                            description: 'Category name',
                        },
                        about: {
                            type: 'string',
                            description: 'Category description',
                        },
                    },
                    required: ['who'],
                },
                Language: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Language ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Language name',
                        },
                    },
                },
            },
        },
        paths: {
            '/authors': {
                get: {
                    tags: ['Authors'],
                    summary: 'Get all authors',
                    description: 'Retrieve a list of all authors',
                    responses: {
                        '200': {
                            description: 'List of authors',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Author',
                                        },
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Authors'],
                    summary: 'Create a new author',
                    description: 'Create a new author with name and surname',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string',
                                            description: 'Author first name',
                                        },
                                        surname: {
                                            type: 'string',
                                            description: 'Author last name',
                                        },
                                    },
                                    required: ['name', 'surname'],
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Author created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Author',
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ['Authors'],
                    summary: 'Delete an author',
                    description: 'Delete an author by ID',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            description: 'Author ID to delete',
                                        },
                                    },
                                    required: ['id'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Author deleted successfully',
                        },
                        '400': {
                            description: 'Bad request - ID is required',
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/books': {
                get: {
                    tags: ['Books'],
                    summary: 'Get all books',
                    description: 'Retrieve a list of all books with their authors',
                    responses: {
                        '200': {
                            description: 'List of books',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Book',
                                        },
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Books'],
                    summary: 'Create a new book',
                    description: 'Create a new book with details and author information',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Book',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Book created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Book',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Bad request - Body must be complete',
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ['Books'],
                    summary: 'Delete a book',
                    description: 'Delete a book by ID',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            description: 'Book ID to delete',
                                        },
                                    },
                                    required: ['id'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Book deleted successfully',
                        },
                        '404': {
                            description: 'Book not found',
                        },
                        '500': {
                            description: 'Server error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/course': {
                get: {
                    tags: ['Courses'],
                    summary: 'Get all courses',
                    description: 'Retrieve a list of all courses',
                    responses: {
                        '200': {
                            description: 'List of courses',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Course',
                                        },
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Server error',
                        },
                    },
                },
                post: {
                    tags: ['Courses'],
                    summary: 'Create a new course',
                    description: 'Create a new course with details',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Course',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Course created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Course',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Bad request - Body must be complete',
                        },
                        '500': {
                            description: 'Server error',
                        },
                    },
                },
            },
            '/upload': {
                post: {
                    tags: ['Upload'],
                    summary: 'Upload an icon file',
                    description: 'Upload a file to the server',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        icon: {
                                            type: 'string',
                                            format: 'binary',
                                            description: 'Icon file to upload',
                                        },
                                    },
                                    required: ['icon'],
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'File uploaded successfully',
                        },
                        '404': {
                            description: 'File not found',
                        },
                    },
                },
            },
            '/category': {
                post: {
                    tags: ['Categories'],
                    summary: 'Create a new category',
                    description: 'Create a new category entry',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        who: {
                                            type: 'string',
                                            description: 'Category name',
                                        },
                                        about: {
                                            type: 'string',
                                            description: 'Category description',
                                        },
                                    },
                                    required: ['who'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Category created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Category',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid request body',
                        },
                    },
                },
            },
            '/category/createCategory': {
                post: {
                    tags: ['Categories'],
                    summary: 'Create a new category (alternative endpoint)',
                    description: 'Create a new category entry via createCategory endpoint',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        who: {
                                            type: 'string',
                                            description: 'Category name',
                                        },
                                        about: {
                                            type: 'string',
                                            description: 'Category description',
                                        },
                                    },
                                    required: ['who'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Category created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Category',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Invalid request body',
                        },
                    },
                },
            },
            '/language': {
                post: {
                    tags: ['Languages'],
                    summary: 'Create a new language',
                    description: 'Create a new language entry',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            description: 'Language ID',
                                        },
                                        name: {
                                            type: 'string',
                                            description: 'Language name',
                                        },
                                    },
                                    required: ['id'],
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'Language created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Language',
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'ID not found',
                        },
                    },
                },
            },
        },
    },
    apis: [],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map