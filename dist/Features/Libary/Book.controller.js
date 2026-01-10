"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookrouter = void 0;
const express_1 = require("express");
const book_entity_1 = require("../../entities/book.entity");
const Book_data_1 = require("../../Data/Book.data");
exports.Bookrouter = (0, express_1.Router)();
exports.Bookrouter.get('/', async (req, res) => {
    try {
        const books = await book_entity_1.Book.find({ relations: ['author'] });
        if (books.length === 0) {
            const newcard = book_entity_1.Book.create(Book_data_1.cards);
            await book_entity_1.Book.save(newcard);
            const savedcards = await book_entity_1.Book.find({ relations: ['author'] });
            return res.status(200).json(savedcards);
        }
        return res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error });
    }
});
exports.Bookrouter.post("/", async (req, res) => {
    const [title, discount, price_now, category, about, name, surname] = req.body;
    try {
        if (!title || !discount || !price_now || !category || about || !name || surname) {
            res.send('body toliq toldirish majburiy');
        }
        const book = book_entity_1.Book.create(req.body);
        await book_entity_1.Book.save(book);
        return res.status(201).json(req.body).send('created');
    }
    catch (error) {
        res.send(error);
    }
});
exports.Bookrouter.delete('/', async (req, res) => {
    const { id } = req.body;
    try {
        const newbooks = await book_entity_1.Book.findOne({ where: { id } });
        if (!newbooks) {
            res.send('kitob topilmadi');
        }
        await book_entity_1.Book.remove(newbooks);
        return res.status(203).send('Kitob ochirildi');
    }
    catch (error) {
        res.send(error);
    }
});
