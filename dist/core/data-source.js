"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const author_entity_1 = require("../entities/author.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DB_URL,
    entities: { Book: book_entity_1.Book, Author: author_entity_1.Author },
    synchronize: true,
    logging: true
});
