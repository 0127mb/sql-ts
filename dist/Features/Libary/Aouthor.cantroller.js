"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorrouter = void 0;
const express_1 = require("express");
const author_entity_1 = require("../../entities/author.entity");
exports.authorrouter = (0, express_1.Router)();
// base path /authors, shu sababli '/' ishlatiladi
exports.authorrouter.get('/', async (req, res) => {
    const authors = await author_entity_1.Author.find();
    res.json(authors);
});
exports.authorrouter.post('/', async (req, res) => {
    const { name, surname } = req.body;
    const newAuthor = author_entity_1.Author.create({ name, surname });
    await author_entity_1.Author.save(newAuthor);
    res.status(201).json(newAuthor);
});
