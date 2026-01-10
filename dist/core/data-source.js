"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const author_entity_1 = require("../entities/author.entity");
const course_entity_1 = require("../entities/course.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [book_entity_1.Book, author_entity_1.Author, course_entity_1.CourseEntity],
    synchronize: true,
    logging: true
});
