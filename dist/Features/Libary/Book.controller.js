"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookrouter = void 0;
const express_1 = require("express");
const book_entity_1 = require("../../entities/book.entity");
exports.Bookrouter = (0, express_1.Router)();
exports.Bookrouter.get('/', async (req, res) => {
    const books = await book_entity_1.Book.find({ relations: ["author"] });
    res.json(books);
});
exports.Bookrouter.post('/', async (req, res) => {
    const newBook = book_entity_1.Book.create(req.body);
    await book_entity_1.Book.save(newBook);
    res.status(201).json(newBook);
});
