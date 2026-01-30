"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
// src/swagger.ts
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
/**
 *  -------------------------------------------------------------------------
 *  1️⃣  OPENAPI, INFO & SERVERS
 *  -------------------------------------------------------------------------
 */
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
        /**
         *  -------------------------------------------------------------------------
         *  2️⃣  COMPONENTS (security, schemas)
         *  -------------------------------------------------------------------------
         */
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            /** ----------  M O D E L S   ---------- */
            schemas: {
                /* ----------  VAR QO‘LDA BO‘LGAN MODELLAR  ---------- */
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
                /* ----------  YANGI MODELLAR  ---------- */
                /** Kurs (Course) modeli */
                Course: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string', format: 'url' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['title', 'description'],
                },
                /** Kurs yaratish (multipart/form-data) uchun request body */
                CourseCreate: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string', format: 'binary' },
                    },
                    required: ['title', 'description'],
                },
                /** Level (dars) modeli */
                Level: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string', format: 'url' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                    required: ['name', 'description'],
                },
                /** Level yaratish uchun request body */
                LevelCreate: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string', format: 'binary' },
                    },
                    required: ['name', 'description'],
                },
                /** Review (baholash) modeli */
                Review: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        grade: { type: 'integer', minimum: 1, maximum: 5 },
                        comment: { type: 'string' },
                        user_full_name: { type: 'string' },
                        user_email: { type: 'string', format: 'email' },
                        user_number: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                    },
                    required: [
                        'grade',
                        'comment',
                        'user_full_name',
                        'user_email',
                        'user_number',
                    ],
                },
                /** Review yaratish uchun request body */
                ReviewCreate: {
                    type: 'object',
                    properties: {
                        grade: { type: 'integer', minimum: 1, maximum: 5 },
                        comment: { type: 'string' },
                        user_full_name: { type: 'string' },
                        user_email: { type: 'string', format: 'email' },
                        user_number: { type: 'string' },
                        user_password: { type: 'string', format: 'password' },
                    },
                    required: [
                        'grade',
                        'comment',
                        'user_full_name',
                        'user_email',
                        'user_number',
                        'user_password',
                    ],
                },
            }, // ← end of schemas
        },
        /**
         *  -------------------------------------------------------------------------
         *  3️⃣  GLOBAL SECURITY (JWT bearer) – barcha endpointlar uchun
         *  -------------------------------------------------------------------------
         */
        security: [{ bearerAuth: [] }],
        /**
         *  -------------------------------------------------------------------------
         *  4️⃣  ENDPOINTS (paths)
         *  -------------------------------------------------------------------------
         *  Eski endpoint‑lar (book/author/category) – alohida qo‘shilgan.
         *  Yangi endpoint‑lar (courses, levels, reviews) ham qo‘shildi.
         *  Agar siz hamma controller‑larda JSDoc yozsangiz, `apis` qismi ularni
         *  avtomatik qo‘shadi; lekin bu yerda ham aniq ko‘rinish beramiz.
         *  -------------------------------------------------------------------------
         */
        paths: {
            /* ----------  OLD ENDPOINTS  ---------- */
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
                                        image: { type: 'string', format: 'binary' },
                                    },
                                    required: ['title', 'discount', 'price_now'],
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Book created' } },
                },
            },
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
                                        image: { type: 'string', format: 'binary' },
                                    },
                                    required: ['name', 'surname'],
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Author created' } },
                },
            },
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
                                        image: { type: 'string', format: 'binary' },
                                    },
                                    required: ['who'],
                                },
                            },
                        },
                    },
                    responses: { 201: { description: 'Category created' } },
                },
            },
            /* ----------  NEW ENDPOINTS  ---------- */
            /** GET + POST  /api/courses */
            '/api/courses': {
                get: {
                    tags: ['Courses'],
                    summary: 'Get all courses',
                    description: 'Return an array with every course stored in the system',
                    responses: {
                        200: {
                            description: 'Array of courses',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: { $ref: '#/components/schemas/Course' },
                                    },
                                },
                            },
                        },
                        500: { description: 'Server error' },
                    },
                },
                post: {
                    tags: ['Courses'],
                    summary: 'Create a new course',
                    description: 'Create a course (title, description, image). Image is uploaded with multipart/form-data.',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: { $ref: '#/components/schemas/CourseCreate' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Course created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Course' },
                                },
                            },
                        },
                        400: { description: 'Invalid request body' },
                        500: { description: 'Server error' },
                    },
                },
            },
            /** POST /api/levels */
            '/api/levels': {
                post: {
                    tags: ['Levels'],
                    summary: 'Create a new level (dars)',
                    description: 'Create a level with name, description and optional image (multipart/form-data).',
                    requestBody: {
                        required: true,
                        content: {
                            'multipart/form-data': {
                                schema: { $ref: '#/components/schemas/LevelCreate' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Level created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Level' },
                                },
                            },
                        },
                        400: { description: 'Invalid request body' },
                        500: { description: 'Server error' },
                    },
                },
            },
            /** POST /api/reviews/books */
            '/api/reviews/books': {
                post: {
                    tags: ['Reviews'],
                    summary: 'Create a review for a book',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ReviewCreate' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Review created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Review' },
                                },
                            },
                        },
                        400: { description: 'Invalid body or user authentication failed' },
                        500: { description: 'Server error' },
                    },
                },
            },
            /** POST /api/reviews/courses */
            '/api/reviews/courses': {
                post: {
                    tags: ['Reviews'],
                    summary: 'Create a review for a course',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ReviewCreate' },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Review created successfully',
                            content: {
                                'application/json': {
                                    schema: { $ref: '#/components/schemas/Review' },
                                },
                            },
                        },
                        400: { description: 'Invalid body or user authentication failed' },
                        500: { description: 'Server error' },
                    },
                },
            },
        }, // ← end of paths
    },
    /**  JSDoc‑dan avtomatik to‘plangan hamma controller‑lar  */
    apis: ['./src/**/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map