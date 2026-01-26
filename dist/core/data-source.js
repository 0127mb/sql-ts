"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const author_entity_1 = require("../entities/author.entity");
const course_entity_1 = require("../entities/course.entity");
const Cart_entity_1 = require("../Features/Cart/entites/Cart.entity");
const category_entity_1 = require("../entities/category.entity");
const language_entity_1 = require("../Features/languages/entities/language.entity");
const favorite_entity_1 = require("../Features/favorites/entities/favorite.entity");
const User_entity_1 = require("../auth/entites/User.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: [book_entity_1.Book, author_entity_1.Author, course_entity_1.CourseEntity, Cart_entity_1.Cart, category_entity_1.Category, language_entity_1.Language, favorite_entity_1.Favorite, User_entity_1.User],
    synchronize: true,
    logging: true
});
//# sourceMappingURL=data-source.js.map