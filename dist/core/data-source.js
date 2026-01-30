"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../Book/entity/book.entity");
const author_entity_1 = require("../Author/entity/author.entity");
const course_entity_1 = require("../course/entities/course.entity");
const category_entity_1 = require("../Category/entity/category.entity");
const language_entity_1 = require("../Features/languages/entities/language.entity");
const User_entity_1 = require("../auth/entites/User.entity");
const review_entity_1 = require("../Features/review/review.entity");
const Level_entity_1 = require("../Features/difficulty/entity/Level.entity");
exports.AppDataSource = new typeorm_1.DataSource({ type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "homework",
    entities: [book_entity_1.Book, author_entity_1.Author, course_entity_1.CourseEntity, category_entity_1.Category, language_entity_1.Language, User_entity_1.User, review_entity_1.Reviews, Level_entity_1.LevelEntity],
    synchronize: true,
    logging: true
});
//# sourceMappingURL=data-source.js.map